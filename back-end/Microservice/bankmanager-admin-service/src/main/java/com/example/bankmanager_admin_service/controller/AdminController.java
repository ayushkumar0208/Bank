package com.example.bankmanager_admin_service.controller;

import com.example.bankmanager_admin_service.client.BankEmployeeClient;
import com.example.bankmanager_admin_service.client.CustomerClient;
import com.example.bankmanager_admin_service.client.TransactionClient;
import com.example.bankmanager_admin_service.dto.*;
import com.example.bankmanager_admin_service.model.Admin;
import com.example.bankmanager_admin_service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private BankEmployeeClient bankEmployeeClient;

    @Autowired
    private CustomerClient customerClient;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Admin admin = adminService.authenticateAndReturnAdmin(loginRequest.getSsnId(), loginRequest.getPassword());
        if (admin != null) {
            return ResponseEntity.ok(admin);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    // ✅ EMPLOYEE CRUD using Feign + DTOs
    @GetMapping("/employees")
    public ResponseEntity<List<BankEmployeeDTO>> getAllEmployees() {
        return ResponseEntity.ok(adminService.getAllEmployees());
    }

    @GetMapping("/employees/{userId}")
    public ResponseEntity<BankEmployeeDTO> getEmployeeByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(adminService.getEmployeeByUserId(userId));
    }

    @PostMapping("/employees")
    public ResponseEntity<BankEmployeeDTO> createEmployee(@RequestBody BankEmployeeDTO employee) {
        return ResponseEntity.ok(adminService.createEmployee(employee));
    }

    @PutMapping("/employees/{userId}")
    public ResponseEntity<BankEmployeeDTO> updateEmployee(
            @PathVariable String userId,
            @RequestBody BankEmployeeDTO updatedEmployee) {
        return ResponseEntity.ok(adminService.updateEmployee(userId, updatedEmployee));
    }

    @DeleteMapping("/employees/{userId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String userId) {
        adminService.deleteEmployee(userId);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    // ✅ CUSTOMER CRUD using Feign + DTOs
    @GetMapping("/customers")
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        return ResponseEntity.ok(adminService.getAllCustomers());
    }

    @PostMapping("/customers")
    public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customer) {
        return ResponseEntity.ok(adminService.createCustomer(customer));
    }

    @GetMapping("/customers/{ssnId}")
    public ResponseEntity<CustomerDTO> getCustomerBySsnId(@PathVariable String ssnId) {
        return ResponseEntity.ok(adminService.getCustomerBySsnId(ssnId));
    }

    @PutMapping("/customers/{ssnId}")
    public ResponseEntity<CustomerDTO> updateCustomer(
            @PathVariable String ssnId,
            @RequestBody CustomerDTO updatedCustomer) {
        return ResponseEntity.ok(adminService.updateCustomer(ssnId, updatedCustomer));
    }

    @DeleteMapping("/customers/{ssnId}")
    public ResponseEntity<String> deleteCustomer(@PathVariable String ssnId) {
        adminService.deleteCustomer(ssnId);
        return ResponseEntity.ok("Customer deleted successfully");
    }

    @PostMapping("/customers/{ssnId}/deposit")
    public ResponseEntity<TransactionResponse> deposit(@PathVariable("ssnId") String ssnId, @RequestBody TransactionRequest request) {
        return adminService.deposit(ssnId, request);
    }

    @PostMapping("/customers/{ssnId}/withdraw")
    public ResponseEntity<TransactionResponse> withdraw(@PathVariable("ssnId") String ssnId, @RequestBody TransactionRequest request) {
        return adminService.withdraw(ssnId, request);
    }

    @PostMapping("/customers/transfer")
    public ResponseEntity<Boolean> transferFunds(@RequestBody TransferRequest request) {
        return adminService.transferFunds(request);
    }

    @GetMapping("/customers/{ssnId}/transactions")
    public ResponseEntity<List<TransactionResponse>> getTransactions(@PathVariable("ssnId") String ssnId) {
        return adminService.getTransactions(ssnId);
    }
}
