package com.example.customer_transaction_loan_service.repository;

import com.example.customer_transaction_loan_service.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySsnId(String ssnId);
}