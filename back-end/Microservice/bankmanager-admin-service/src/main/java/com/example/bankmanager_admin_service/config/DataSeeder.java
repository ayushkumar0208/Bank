package com.example.bankmanager_admin_service.config;

import com.example.bankmanager_admin_service.model.BankManager;
import com.example.bankmanager_admin_service.repository.BankManagerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder {

    @Autowired
    private BankManagerRepository bankManagerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @EventListener(ContextRefreshedEvent.class)
    public void seedDatabase() {
        seedBankManager();
    }

    private void seedBankManager() {
        if (bankManagerRepository.count() == 0) {
            BankManager manager = new BankManager();
            manager.setUserId("manager001");
            manager.setFirstName("John");
            manager.setLastName("Doe");
            manager.setEmail("manager@example.com");
            manager.setPassword(passwordEncoder.encode("manager123"));
            

            bankManagerRepository.save(manager);
            System.out.println("Bank manager seeded successfully.");
        } else {
            System.out.println("Bank manager already exists in the database.");
        }
    }
}