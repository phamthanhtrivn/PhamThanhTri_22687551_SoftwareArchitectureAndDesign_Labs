package iuh.fit.consumer.config;

import org.springframework.amqp.core.Queue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Value("${queue.order}")
    private String orderQueue;

    @Value("${queue.dlq}")
    private String deadLetterQueue;

    @Bean
    public Queue orderQueue() {
        return new Queue(orderQueue, true, false, false);
    }

    @Bean
    public Queue deadLetterQueue() {
        return new Queue(deadLetterQueue, true);
    }
}
