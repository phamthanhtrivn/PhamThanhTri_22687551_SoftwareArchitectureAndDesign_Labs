const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const amqp = require('amqplib');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8083;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://172.16.56.67:27017/movie_booking_db';
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://172.16.56.67';

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Booking Service: Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

// RabbitMQ Connection
let channel;
let rabbitConnection;
async function connectRabbitMQ() {
  try {
    rabbitConnection = await amqp.connect(RABBITMQ_URL);
    channel = await rabbitConnection.createChannel();
    await channel.assertExchange('movie_events', 'topic', { durable: false });

    rabbitConnection.on('error', (err) => {
      console.error('RabbitMQ connection error:', err.message);
    });

    rabbitConnection.on('close', () => {
      channel = undefined;
      rabbitConnection = undefined;
      console.error('RabbitMQ connection closed. Retrying in 5s...');
      setTimeout(connectRabbitMQ, 5000);
    });
    
    // Listen for payment results to update booking status
    const q = await channel.assertQueue('', { exclusive: true });
    channel.bindQueue(q.queue, 'movie_events', 'payment.completed');
    channel.bindQueue(q.queue, 'movie_events', 'booking.failed');
    
    channel.consume(q.queue, async (msg) => {
      if (msg.content) {
        const event = JSON.parse(msg.content.toString());
        console.log(`Booking Service received event: ${event.type}`);
        
        if (event.type === 'PAYMENT_COMPLETED') {
          await Booking.findByIdAndUpdate(event.payload.bookingId, { status: 'CONFIRMED' });
        } else if (event.type === 'BOOKING_FAILED') {
          await Booking.findByIdAndUpdate(event.payload.bookingId, { status: 'FAILED' });
        }
      }
    }, { noAck: true });

    console.log('Booking Service: Connected to RabbitMQ');
  } catch (error) {
    channel = undefined;
    rabbitConnection = undefined;
    console.error('RabbitMQ connection error. Retrying in 5s...', error.message);
    setTimeout(connectRabbitMQ, 5000);
  }
}
connectRabbitMQ();

// Booking Schema
const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
  seats: [{ type: String }],
  status: { type: String, default: 'PENDING' }, // PENDING, CONFIRMED, FAILED
  createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// GET /bookings
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// POST /bookings
app.post('/bookings', async (req, res) => {
  const { userId, movieId, seats } = req.body;
  try {
    const normalizedSeats = Array.isArray(seats) ? seats : [];
    const booking = new Booking({ userId, movieId, seats: normalizedSeats, status: 'PENDING' });
    await booking.save();

    // Publish Event
    if (channel) {
      try {
        const event = {
          type: 'BOOKING_CREATED',
          payload: {
            bookingId: booking._id,
            userId,
            movieId,
            amount: normalizedSeats.length * 100000 // Mock amount calculation
          }
        };
        channel.publish('movie_events', 'booking.created', Buffer.from(JSON.stringify(event)));
        console.log(`Published BOOKING_CREATED event for booking ${booking._id}`);
      } catch (publishError) {
        console.error('Failed to publish BOOKING_CREATED event:', publishError.message);
      }
    } else {
      console.warn(`RabbitMQ channel is unavailable. Booking ${booking._id} saved without event publish.`);
    }

    res.status(201).json(booking);
  } catch (err) {
    console.error('Error creating booking:', err.message);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Booking Service running on port ${PORT}`);
});
