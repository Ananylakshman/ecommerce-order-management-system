package com.example.demo.service;

import com.example.demo.model.Order;
import com.example.demo.model.OrderCreatedEvent;
import com.example.demo.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderProducer orderProducer;

    public OrderService(
            OrderRepository orderRepository,
            OrderProducer orderProducer) {

        this.orderRepository = orderRepository;
        this.orderProducer = orderProducer;
    }

    public Order placeOrder(Order order) {

    order.setStatus("CREATED");

    Order savedOrder =
            orderRepository.save(order);

    OrderCreatedEvent event =
            new OrderCreatedEvent();

    event.setOrderId(savedOrder.getId());
    event.setProductId(savedOrder.getProductId());
    event.setQuantity(savedOrder.getQuantity());

    try {

        orderProducer.publishOrderCreatedEvent(event);

    } catch (Exception e) {

        System.out.println(
                "Kafka not available. Order saved successfully."
        );
    }

    return savedOrder;
}

    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }
}