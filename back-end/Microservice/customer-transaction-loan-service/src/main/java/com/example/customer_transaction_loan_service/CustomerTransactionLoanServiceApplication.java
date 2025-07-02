package com.example.customer_transaction_loan_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CustomerTransactionLoanServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerTransactionLoanServiceApplication.class, args);
	}

}



