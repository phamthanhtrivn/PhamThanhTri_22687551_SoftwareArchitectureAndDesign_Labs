package iuh.fit.consumer.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class OrderConsumer {

    @RabbitListener(queues = "${queue.order}")
    public void consume(String message) {
        System.out.println("Processing message: " + message);

        if (!message.contains("\"orderId\":")) {
            throw new RuntimeException("Invalid message format: missing orderId");
        }

        System.out.println("Process success");
    }

}
