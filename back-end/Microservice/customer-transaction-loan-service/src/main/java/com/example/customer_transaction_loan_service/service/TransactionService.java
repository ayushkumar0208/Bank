package com.example.customer_transaction_loan_service.service;

import com.example.customer_transaction_loan_service.model.CustomerEntity;
import com.example.customer_transaction_loan_service.model.Transaction;
import com.example.customer_transaction_loan_service.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    @Autowired
    private CustomerService customerService;

    public Transaction createTransaction(String ssnId, double amount, String transactionType) {
        CustomerEntity customer = customerService.findBySsnId(ssnId);

        if (customer == null) {
            throw new RuntimeException("Customer not found");
        }

        if ("Withdraw".equalsIgnoreCase(transactionType)) {
            if (customer.getAccountBalance() < amount) {
                throw new RuntimeException("Insufficient balance");
            }
            customer.setAccountBalance(customer.getAccountBalance() - amount);
        } else if ("Deposit".equalsIgnoreCase(transactionType)) {
            customer.setAccountBalance(customer.getAccountBalance() + amount);
        }

        customerService.updateCustomer(customer);

        Transaction transaction = new Transaction();
        transaction.setSsnId(ssnId);
        transaction.setAmount("Withdraw".equalsIgnoreCase(transactionType) ? -amount : amount);
        transaction.setTransactionType(transactionType);
        transaction.setTransactionTime(LocalDateTime.now());

        return repository.save(transaction);
    }

    public List<Transaction> getTransactions(String ssnId) {
        return repository.findBySsnId(ssnId);
    }

    public boolean transferAmount(String senderSsnId, String receiverSsnId, double amount) {
        if (amount <= 0) return false;

        CustomerEntity sender = customerService.findBySsnId(senderSsnId);
        CustomerEntity receiver = customerService.findBySsnId(receiverSsnId);

        if (sender == null || receiver == null) return false;
        if (sender.getAccountBalance() < amount) return false;

        // Adjust balances
        sender.setAccountBalance(sender.getAccountBalance() - amount);
        receiver.setAccountBalance(receiver.getAccountBalance() + amount);

        // Save changes
        customerService.updateCustomer(sender);
        customerService.updateCustomer(receiver);

        // Log transactions
        Transaction senderTxn = new Transaction();
        senderTxn.setSsnId(senderSsnId);
        senderTxn.setAmount(-amount);
        senderTxn.setTransactionType("Transfer to " + receiverSsnId);
        senderTxn.setTransactionTime(LocalDateTime.now());
        repository.save(senderTxn);

        Transaction receiverTxn = new Transaction();
        receiverTxn.setSsnId(receiverSsnId);
        receiverTxn.setAmount(amount);
        receiverTxn.setTransactionType("Received from " + senderSsnId);
        receiverTxn.setTransactionTime(LocalDateTime.now());
        repository.save(receiverTxn);

        return true;
    }
}