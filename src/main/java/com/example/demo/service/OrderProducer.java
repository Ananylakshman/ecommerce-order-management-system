package com.example.demo.service;

import com.example.demo.model.OrderCreatedEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderProducer {

    private final KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate;

    public OrderProducer(
            KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate) {

        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishOrderCreatedEvent(
            OrderCreatedEvent event) {

        kafkaTemplate.send(
                "order-topic",
                event
        );

        System.out.println(
                "Event Published: " + event
        );
    }
}