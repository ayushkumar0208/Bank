package com.example.bankmanager_admin_service.controller;

import com.example.bankmanager_admin_service.dto.BankEmployeeDTO;
import com.example.bankmanager_admin_service.dto.CustomerDTO;
import com.example.bankmanager_admin_service.model.BankManager;
import com.example.bankmanager_admin_service.service.BankManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bankmanager")
public class BankManagerController {

    @Autowired
    private BankManagerService bankManagerService;

    // ✅ Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody BankManager loginRequest) {
        try {
            BankManager manager = bankManagerService.login(loginRequest.getUserId(), loginRequest.getPassword());
            return ResponseEntity.ok(manager);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    // ✅ Manager Creation
    @PostMapping
    public ResponseEntity<BankManager> createManager(@RequestBody BankManager manager) {
        return ResponseEntity.ok(bankManagerService.createManager(manager));
    }

    // ✅ CUSTOMER CRUD using Feign + DTOs
    @GetMapping("/customers")
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        return ResponseEntity.ok(bankManagerService.getAllCustomers());
    }

    @GetMapping("/customers/{ssnId}")
    public ResponseEntity<CustomerDTO> getCustomerBySsnId(@PathVariable String ssnId) {
        return ResponseEntity.ok(bankManagerService.getCustomerBySsnId(ssnId));
    }

    @PostMapping("/customers")
    public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customer) {
        return ResponseEntity.ok(bankManagerService.createCustomer(customer));
    }

    @PutMapping("/customers/{ssnId}")
    public ResponseEntity<CustomerDTO> updateCustomer(
            @PathVariable String ssnId,
            @RequestBody CustomerDTO updatedCustomer) {
        return ResponseEntity.ok(bankManagerService.updateCustomer(ssnId, updatedCustomer));
    }

    @DeleteMapping("/customers/{ssnId}")
    public ResponseEntity<String> deleteCustomer(@PathVariable String ssnId) {
        bankManagerService.deleteCustomer(ssnId);
        return ResponseEntity.ok("Customer deleted successfully");
    }

    // ✅ EMPLOYEE CRUD using Feign + DTOs
    @GetMapping("/employees")
    public ResponseEntity<List<BankEmployeeDTO>> getAllEmployees() {
        return ResponseEntity.ok(bankManagerService.getAllEmployees());
    }

    @GetMapping("/employees/{userId}")
    public ResponseEntity<BankEmployeeDTO> getEmployeeByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(bankManagerService.getEmployeeByUserId(userId));
    }

    @PostMapping("/employees")
    public ResponseEntity<BankEmployeeDTO> createEmployee(@RequestBody BankEmployeeDTO employee) {
        return ResponseEntity.ok(bankManagerService.createEmployee(employee));
    }

    @PutMapping("/employees/{userId}")
    public ResponseEntity<BankEmployeeDTO> updateEmployee(
            @PathVariable String userId,
            @RequestBody BankEmployeeDTO updatedEmployee) {
        return ResponseEntity.ok(bankManagerService.updateEmployee(userId, updatedEmployee));
    }

    @DeleteMapping("/employees/{userId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String userId) {
        bankManagerService.deleteEmployee(userId);
        return ResponseEntity.ok("Employee deleted successfully");
    }
}