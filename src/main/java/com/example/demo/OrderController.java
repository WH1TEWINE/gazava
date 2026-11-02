package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    // Здесь будут храниться заказы (пока сервер работает)
    private List<Order> orders = new ArrayList<>();

    // 1. Сайт отправляет заказ сюда (POST запрос)
    @PostMapping
    public String receiveOrder(@RequestBody Order order) {
        orders.add(order);
        System.out.println("Новый заказ от: " + order.getCustomerName());
        return "Заказ успешно принят!";
    }

    // 2. Вы открываете эту ссылку, чтобы посмотреть заказы (GET запрос)
    @GetMapping("/view")
    public List<Order> viewOrders() {
        return orders;
    }
}