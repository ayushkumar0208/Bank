package com.example.customer_transaction_loan_service.repository;

import com.example.customer_transaction_loan_service.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan,Long> {
    boolean existsBySsnid(String ssnid);
}
