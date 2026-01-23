package iuh.fit.producer.controller;

import iuh.fit.producer.dto.OrderMessageDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class ProducerController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${queue.order}")
    private String orderQueue;

    @PostMapping("/send")
    public ResponseEntity<?> send(@RequestBody OrderMessageDTO message) {
        message.setTimestamp(LocalDateTime.now());

        rabbitTemplate.convertAndSend(orderQueue, message);
        return ResponseEntity.ok(message);
    }

}
