package com.example.bankmanager_admin_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BankmanagerAdminServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BankmanagerAdminServiceApplication.class, args);
	}

}
