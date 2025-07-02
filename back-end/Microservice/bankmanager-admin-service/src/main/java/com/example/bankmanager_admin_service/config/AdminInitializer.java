package com.example.bankmanager_admin_service.config;

import com.example.bankmanager_admin_service.model.Admin;
import com.example.bankmanager_admin_service.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    public CommandLineRunner createFirstAdmin(AdminRepository adminRepo, PasswordEncoder passwordEncoder) {
        return args -> {
            if (adminRepo.count() == 0) {
                Admin admin = new Admin("admin", passwordEncoder.encode("Admin@123"));
                adminRepo.save(admin);
                System.out.println("✅ First admin created: username = admin, password = Admin@123");
            }
        };
    }
}