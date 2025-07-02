package com.example.bank_employee_service.client;

import com.example.bank_employee_service.dto.CustomerDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@FeignClient(
	    name = "customer-transaction-loan-service",
	    contextId = "customerClient")
public interface CustomerClient {

    @GetMapping("/api/customers/all")
    ResponseEntity<List<CustomerDTO>> getAllCustomers();

    @GetMapping("/api/customers/{ssnId}")
    ResponseEntity<CustomerDTO> getCustomerBySsnId(@PathVariable String ssnId);

    @PostMapping("/api/customers/register")
    ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customer);

    @PutMapping("/api/customers/{ssnId}")
    CustomerDTO updateCustomer(@PathVariable("ssnId") String ssnId, @RequestBody CustomerDTO customer);

    @DeleteMapping("/api/customers/{ssnId}")
    ResponseEntity<String> deleteCustomer(@PathVariable("ssnId") String ssnId);

    @PostMapping("/api/customers/{ssnId}/deposit")
    ResponseEntity<Void> deposit(@PathVariable String ssnId, @RequestParam double amount);

    @PostMapping("/api/customers/{ssnId}/withdraw")
    ResponseEntity<Void> withdraw(@PathVariable String ssnId, @RequestParam double amount);
}

