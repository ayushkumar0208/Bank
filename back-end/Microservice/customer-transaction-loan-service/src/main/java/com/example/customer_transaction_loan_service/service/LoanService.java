package com.example.customer_transaction_loan_service.service;

import com.example.customer_transaction_loan_service.model.Loan;
import com.example.customer_transaction_loan_service.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    public Loan createLoan(Loan loan) {
        if (loanRepository.existsBySsnid(loan.getSsnid())) {
            throw new IllegalArgumentException("Loan with SSNID already exists");
        }
        return loanRepository.save(loan);
    }

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public Optional<Loan> getLoanById(Long id) {
        return loanRepository.findById(id);
    }

    public void deleteLoan(Long id) {
        loanRepository.deleteById(id);
    }
}
