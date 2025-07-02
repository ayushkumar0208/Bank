package com.example.bankmanager_admin_service.repository;

import com.example.bankmanager_admin_service.model.BankManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankManagerRepository extends JpaRepository<BankManager, Long> {
    BankManager findByUserId(String userId); // Find a manager by User ID
}