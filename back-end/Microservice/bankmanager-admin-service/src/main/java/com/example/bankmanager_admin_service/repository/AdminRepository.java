package com.example.bankmanager_admin_service.repository;

import com.example.bankmanager_admin_service.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);
    Admin findByUsernameAndPassword(String username, String password);
}
