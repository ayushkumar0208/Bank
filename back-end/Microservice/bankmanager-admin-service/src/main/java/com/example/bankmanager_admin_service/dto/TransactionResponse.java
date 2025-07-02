package com.example.bankmanager_admin_service.dto;

import java.time.LocalDateTime;

public class TransactionResponse {

    private Long id;
    private String ssnId;
    private double amount;
    private String transactionType;
    private LocalDateTime transactionTime;

    // Constructors
    public TransactionResponse() {}

    public TransactionResponse(Long id, String ssnId, double amount, String transactionType, LocalDateTime transactionTime) {
        this.id = id;
        this.ssnId = ssnId;
        this.amount = amount;
        this.transactionType = transactionType;
        this.transactionTime = transactionTime;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSsnId() {
        return ssnId;
    }

    public void setSsnId(String ssnId) {
        this.ssnId = ssnId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public LocalDateTime getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(LocalDateTime transactionTime) {
        this.transactionTime = transactionTime;
    }
}