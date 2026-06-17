package com.rajesh.library_system.borrow_service.service;

import com.rajesh.library_system.borrow_service.dto.BorrowEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BorrowEventProducer {

    private final KafkaTemplate<String, BorrowEvent> kafkaTemplate;

    private static final String TOPIC = "borrow-events";

    public void publish(BorrowEvent event) {

        kafkaTemplate.send(
                TOPIC,
                String.valueOf(event.getBookId()),
                event
        );

        System.out.println(
                "Event Published => " + event.getEventType()
        );
    }
}
