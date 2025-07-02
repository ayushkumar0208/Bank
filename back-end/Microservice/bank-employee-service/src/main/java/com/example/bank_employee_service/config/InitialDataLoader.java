package com.example.bank_employee_service.config;

import com.example.bank_employee_service.model.BankEmployee;
import com.example.bank_employee_service.repository.BankEmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class InitialDataLoader {

    @Bean
    CommandLineRunner init(BankEmployeeRepository bankEmployeeRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if the employee with userId = "defaultUser" already exists
            BankEmployee existingEmployee = bankEmployeeRepository.findByUserId("defaultUser");
            if (existingEmployee == null) {
                BankEmployee employee = new BankEmployee();
                employee.setFirstName("Default");
                employee.setLastName("User");
                employee.setUserId("defaultUser");
                employee.setPassword(passwordEncoder.encode("defaultPass"));
                employee.setPosition("Manager");
                employee.setEmail("default@gmail.com");
                employee.setSalary(50000.0);
                employee.setPhoneNumber("1234567890");
               
                bankEmployeeRepository.save(employee);
            }
        };
    }
}