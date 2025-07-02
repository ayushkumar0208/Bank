package com.example.customer_transaction_loan_service.dto;

public class TransferRequest {
    private String senderSsnId;
    private String receiverSsnId;
    private double amount;

    public String getSenderSsnId() {
        return senderSsnId;
    }

    public void setSenderSsnId(String senderSsnId) {
        this.senderSsnId = senderSsnId;
    }

    public String getReceiverSsnId() {
        return receiverSsnId;
    }

    public void setReceiverSsnId(String receiverSsnId) {
        this.receiverSsnId = receiverSsnId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}