package com.example.demo;

public class Order {
    private String customerName;
    private String phone;
    private String items;
    private double totalPrice;

    // Геттеры и сеттеры (нужны, чтобы Spring мог читать данные)
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getItems() { return items; }
    public void setItems(String items) { this.items = items; }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
}
