const express = require("express");
const msql = require("mysql2");

const app = express();

const db = msql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connectWithRetry = () => {
  db.connect((err) => {
    if (err) {
      console.log("⏳ MySQL chưa sẵn sàng, retry 2s...");
      setTimeout(connectWithRetry, 2000);
    } else {
      console.log("✅ Connected to MySQL database!");
    }
  });
};

connectWithRetry();

app.get("/", (req, res) => {
  res.send("Hello NodeJS + MySQL Docker!");
});

app.get("/users", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, results) => {
    if (err) {
            console.error('❌ Query error:', err);
            return res.status(500).json({ error: err.message });
        }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
