package com.example.customer_transaction_loan_service.controller;

import com.example.customer_transaction_loan_service.model.CustomerEntity;
import com.example.customer_transaction_loan_service.model.Transaction;
import com.example.customer_transaction_loan_service.service.CustomerService;
import com.example.customer_transaction_loan_service.service.TransactionService;
import com.example.customer_transaction_loan_service.dto.LoginRequest;
import com.example.customer_transaction_loan_service.dto.TransactionRequest;
import com.example.customer_transaction_loan_service.dto.TransferRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final CustomerService customerService;

    public TransactionController(TransactionService transactionService, CustomerService customerService) {
        this.transactionService = transactionService;
        this.customerService = customerService;
    }

    // Deposit
    @PostMapping("/{ssnId}/deposit")
    public ResponseEntity<Transaction> deposit(@PathVariable String ssnId, @RequestBody TransactionRequest request) {
        if (request.getAmount() <= 0) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(transactionService.createTransaction(ssnId, request.getAmount(), "Deposit"));
    }

    // Withdraw
    @PostMapping("/{ssnId}/withdraw")
    public ResponseEntity<Transaction> withdraw(@PathVariable String ssnId, @RequestBody TransactionRequest request) {
        if (request.getAmount() < 1000) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(transactionService.createTransaction(ssnId, request.getAmount(), "Withdraw"));
    }

    // Transfer
    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody TransferRequest request) {
        String sender = request.getSenderSsnId();
        String receiver = request.getReceiverSsnId();
        double amount = request.getAmount();

        if (sender == null || receiver == null || amount <= 0) {
            return ResponseEntity.badRequest().body("Invalid request");
        }

        boolean result = transactionService.transferAmount(sender, receiver, amount);
        return ResponseEntity.ok(result);
    }

    // Get All Transactions
    @GetMapping("/{ssnId}")
    public ResponseEntity<List<Transaction>> getTransactions(@PathVariable String ssnId) {
        return ResponseEntity.ok(transactionService.getTransactions(ssnId));
    }

    // Check Balance
    @PostMapping("/balance")
    public ResponseEntity<?> checkBalance(@RequestBody LoginRequest request) {
        String ssnId = request.getSsnId();
        String password = request.getPassword();

        if (ssnId == null || password == null) {
            return ResponseEntity.badRequest().body("SSN ID and password are required");
        }

        CustomerEntity customer = customerService.login(ssnId, password);
        if (customer == null) {
            return ResponseEntity.status(401).body("Invalid SSN ID or password");
        }

        return ResponseEntity.ok("Your account balance is ₹" + customer.getAccountBalance());
    }
}