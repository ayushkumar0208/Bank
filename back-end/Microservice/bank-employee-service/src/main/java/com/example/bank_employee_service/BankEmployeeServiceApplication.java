package com.example.bank_employee_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BankEmployeeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankEmployeeServiceApplication.class, args);
	}

}
