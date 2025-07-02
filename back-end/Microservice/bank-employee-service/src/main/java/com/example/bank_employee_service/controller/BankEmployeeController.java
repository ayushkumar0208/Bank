package com.example.bank_employee_service.controller;

import com.example.bank_employee_service.dto.CustomerDTO;
import com.example.bank_employee_service.dto.LoginRequest;
import com.example.bank_employee_service.model.BankEmployee;
import com.example.bank_employee_service.service.BankEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bank-employee")
public class BankEmployeeController {

    @Autowired
    private BankEmployeeService bankEmployeeService;

    // ✅ Register a new bank employee
    @PostMapping("/register")
    public ResponseEntity<BankEmployee> registerEmployee(@RequestBody BankEmployee employee) {
        BankEmployee registeredEmployee = bankEmployeeService.registerEmployee(employee);
        return ResponseEntity.ok(registeredEmployee);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<BankEmployee> getEmployeeByUserId(@PathVariable String userId) {
        BankEmployee employee = bankEmployeeService.getEmployeeByUserId(userId);
        return employee != null
                ? ResponseEntity.ok(employee)
                : ResponseEntity.notFound().build();
    }


    // ✅ Update Employee
    @PutMapping("/{userId}")
    public ResponseEntity<BankEmployee> updateEmployee(@PathVariable String userId, @RequestBody BankEmployee updated) {
        BankEmployee employee = bankEmployeeService.updateEmployee(userId, updated);
        return employee != null ? ResponseEntity.ok(employee) : ResponseEntity.notFound().build();
    }

    // Delete employee by ID
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String userId) {
        bankEmployeeService.deleteEmployee(userId);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    // ✅ Employee login
    @PostMapping("/login")
    public ResponseEntity<?> authenticateEmployee(@RequestBody LoginRequest loginRequest) {
        BankEmployee authenticatedEmployee = bankEmployeeService.authenticateEmployee(
                loginRequest.getSsnId(), loginRequest.getPassword());
        return authenticatedEmployee != null
                ? ResponseEntity.ok(authenticatedEmployee)
                : ResponseEntity.status(401).body("Invalid credentials. Please try again.");
    }
    
 // ✅ Get all employees (for admin use)
    @GetMapping("/employees")
    public ResponseEntity<List<BankEmployee>> getAllEmployees() {
        return ResponseEntity.ok(bankEmployeeService.getAllEmployees());
    }
    
    

    // ✅ Get all customers
    @GetMapping("/customers")
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        return ResponseEntity.ok(bankEmployeeService.getAllCustomers());
    }

    // ✅ Get customer by SSN ID
    @GetMapping("/customers/{ssnId}")
    public ResponseEntity<CustomerDTO> getCustomerBySsnId(@PathVariable String ssnId) {
        return ResponseEntity.ok(bankEmployeeService.getCustomerBySsnId(ssnId));
    }

    // ✅ Create a new customer
    @PostMapping("/customers")
    public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customer) {
        return ResponseEntity.ok(bankEmployeeService.createCustomer(customer));
    }

    @PutMapping("/customers/{ssnId}")
    public ResponseEntity<CustomerDTO> updateCustomer(
            @PathVariable("ssnId") String ssnId,
            @RequestBody CustomerDTO customer) {

        customer.setSsnId(ssnId);
        CustomerDTO updated = bankEmployeeService.updateCustomer(customer);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete customer by SSN ID
    @DeleteMapping("/customers/{ssnId}")
    public ResponseEntity<String> deleteCustomer(@PathVariable String ssnId) {
        bankEmployeeService.deleteCustomer(ssnId);
        return ResponseEntity.ok("Customer deleted successfully.");
    }

    // ✅ Deposit funds
    @PostMapping("/customers/{ssnId}/deposit")
    public ResponseEntity<String> deposit(@PathVariable String ssnId, @RequestParam double amount) {
        bankEmployeeService.deposit(ssnId, amount);
        return ResponseEntity.ok("Deposit successful.");
    }

    // ✅ Withdraw funds
    @PostMapping("/customers/{ssnId}/withdraw")
    public ResponseEntity<String> withdraw(@PathVariable String ssnId, @RequestParam double amount) {
        bankEmployeeService.withdraw(ssnId, amount);
        return ResponseEntity.ok("Withdrawal successful.");
    }

    // ✅ Transfer funds between customers
    @PostMapping("/transfer")
    public ResponseEntity<String> transferFunds(
            @RequestParam String senderSsnId,
            @RequestParam String receiverSsnId,
            @RequestParam double amount) {
        bankEmployeeService.transferFunds(senderSsnId, receiverSsnId, amount);
        return ResponseEntity.ok("Funds transferred successfully.");
    }
}