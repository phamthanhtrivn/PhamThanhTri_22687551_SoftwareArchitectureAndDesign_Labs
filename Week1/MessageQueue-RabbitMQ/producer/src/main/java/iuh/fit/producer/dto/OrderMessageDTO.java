package iuh.fit.producer.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderMessageDTO {
    private String orderId;
    private String message;
    private LocalDateTime timestamp;
}
