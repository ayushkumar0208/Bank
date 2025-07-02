package com.example.customer_transaction_loan_service.repository;

import com.example.customer_transaction_loan_service.model.CustomerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {
    CustomerEntity findBySsnId(String ssnId);
    
    Page<CustomerEntity> findByIsCustomerVerified(boolean isCustomerVerified,Pageable pageable);
}