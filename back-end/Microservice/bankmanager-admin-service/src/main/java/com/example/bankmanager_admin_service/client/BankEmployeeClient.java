package com.example.bankmanager_admin_service.client;

import com.example.bankmanager_admin_service.dto.BankEmployeeDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "bank-employee-service", path = "/bank-employee")
public interface BankEmployeeClient {

    @PostMapping("/register")
    ResponseEntity<BankEmployeeDTO> createEmployee(@RequestBody BankEmployeeDTO employee);

    @GetMapping("/employees")
    ResponseEntity<List<BankEmployeeDTO>> getAllEmployees();

    @GetMapping("/{userId}")
    ResponseEntity<BankEmployeeDTO> getEmployeeByUserId(@PathVariable("userId") String userId);

    @PutMapping("/{userId}")
    ResponseEntity<BankEmployeeDTO> updateEmployee(
            @PathVariable String userId,
            @RequestBody BankEmployeeDTO updatedEmployee);

    @DeleteMapping("/{userId}")
    ResponseEntity<String> deleteEmployee(@PathVariable("userId") String userId);
}