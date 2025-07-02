package com.example.bank_employee_service.repository;

import com.example.bank_employee_service.model.BankEmployee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankEmployeeRepository extends JpaRepository<BankEmployee, Long> {

    // Find BankEmployee by userId
    BankEmployee findByUserId(String userId);
}