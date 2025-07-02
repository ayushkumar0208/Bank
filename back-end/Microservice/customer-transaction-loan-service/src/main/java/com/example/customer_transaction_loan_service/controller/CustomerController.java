package com.example.customer_transaction_loan_service.controller;

import com.example.customer_transaction_loan_service.model.CustomerEntity;
import com.example.customer_transaction_loan_service.service.CustomerService;
import com.example.customer_transaction_loan_service.service.ResourceNotFoundException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.customer_transaction_loan_service.dto.LoginRequest;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService service;

    // ✅ Register a new customer
    @PostMapping("/register")
    public ResponseEntity<CustomerEntity> registerCustomer(@RequestBody CustomerEntity customer) {
        return ResponseEntity.ok(service.registerCustomer(customer));
    }

    // ✅ Get customer by SSN ID
    @GetMapping("/{ssnId}")
    public ResponseEntity<CustomerEntity> getCustomer(@PathVariable String ssnId) {
        CustomerEntity customer = service.findBySsnId(ssnId);
        if (customer == null) {
            throw new ResourceNotFoundException("Customer with SSN ID " + ssnId + " not found");
        }
        return ResponseEntity.ok(customer);
    }

    // ✅ Update customer by SSN ID
    @PutMapping("/{ssnId}")
    public ResponseEntity<CustomerEntity> updateCustomer(
            @PathVariable String ssnId,
            @RequestBody CustomerEntity updatedCustomer
    ) {
        // Set the SSN ID from path variable to ensure consistency
        updatedCustomer.setSsnId(ssnId);

        CustomerEntity updated = service.updateCustomer(updatedCustomer);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete customer by SSN ID
    @DeleteMapping("/{ssnId}")
    public ResponseEntity<String> deleteCustomer(@PathVariable String ssnId) {
        CustomerEntity customer = service.findBySsnId(ssnId);
        if (customer == null) {
            throw new ResourceNotFoundException("Cannot delete. Customer with SSN ID " + ssnId + " not found");
        }
        service.deleteCustomer(ssnId);
        return ResponseEntity.ok("Customer deleted successfully.");
    }
    
   

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        CustomerEntity customer = service.login(request.getSsnId(), request.getPassword());
        if (customer != null) {
            return ResponseEntity.ok(customer); // success
        } else {
            return ResponseEntity.status(401).body("Invalid SSN ID or password");
        }
    }
    
    // ✅ Endpoint to get all customers
    @GetMapping("/all")
    public ResponseEntity<List<CustomerEntity>> getAllCustomers() {
        List<CustomerEntity> customers = service.getAllCustomers();
        return ResponseEntity.ok(customers);
    }
}