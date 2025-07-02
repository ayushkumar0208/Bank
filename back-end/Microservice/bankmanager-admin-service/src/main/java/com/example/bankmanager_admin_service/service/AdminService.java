package com.example.bankmanager_admin_service.service;

import com.example.bankmanager_admin_service.client.BankEmployeeClient;
import com.example.bankmanager_admin_service.client.CustomerClient;
import com.example.bankmanager_admin_service.client.TransactionClient;
import com.example.bankmanager_admin_service.dto.*;
import com.example.bankmanager_admin_service.exception.ResourceNotFoundException;
import com.example.bankmanager_admin_service.model.Admin;
import com.example.bankmanager_admin_service.repository.AdminRepository;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BankEmployeeClient bankEmployeeClient;

    @Autowired
    private CustomerClient customerClient;

    @Autowired
    private TransactionClient transactionClient;

    public Admin authenticateAndReturnAdmin(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return admin;
        }
        return null;
    }

    public Admin createAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public List<BankEmployeeDTO> getAllEmployees() {
        return bankEmployeeClient.getAllEmployees().getBody();
    }

    public BankEmployeeDTO getEmployeeByUserId(String userId) {
        try {
            return bankEmployeeClient.getEmployeeByUserId(userId).getBody();
        }
        catch (FeignException.NotFound ex) {
            throw new ResourceNotFoundException("Customer with SSN " + userId + " not found.");
        }
    }

    public BankEmployeeDTO createEmployee(BankEmployeeDTO employeeDTO) {
        return bankEmployeeClient.createEmployee(employeeDTO).getBody();
    }

    public BankEmployeeDTO updateEmployee(String userId, BankEmployeeDTO updatedEmployee) {
        return bankEmployeeClient.updateEmployee(userId, updatedEmployee).getBody();
    }

    public void deleteEmployee(String userId) {
        try{
            bankEmployeeClient.deleteEmployee(userId);
        }catch (FeignException.NotFound ex) {
            throw new ResourceNotFoundException("Customer with SSN " + userId + " not found.");
        }
    }

    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        return customerClient.createCustomer(customerDTO).getBody();
    }

    public List<CustomerDTO> getAllCustomers() {
        return customerClient.getAllCustomers().getBody();
    }

    public CustomerDTO getCustomerBySsnId(String ssnId) {
        try{
            return customerClient.getCustomerBySsnId(ssnId).getBody();
        }
        catch (FeignException.NotFound ex) {
            throw new ResourceNotFoundException("Customer with SSN " + ssnId + " not found.");
        }
    }

    public CustomerDTO updateCustomer(String ssnId, CustomerDTO customerDTO) {
        return customerClient.updateCustomer(ssnId, customerDTO).getBody();
    }

    public void deleteCustomer(String ssnId) {
        try {
            customerClient.deleteCustomer(ssnId);
        } catch (FeignException.NotFound ex) {
            throw new ResourceNotFoundException("Customer with SSN " + ssnId + " not found.");
        }
    }

    public ResponseEntity<TransactionResponse> deposit(@PathVariable String ssnId, @RequestBody TransactionRequest request) {
        try {
            return transactionClient.deposit(ssnId, request);
        } catch (FeignException.NotFound ex) {
            throw new ResourceNotFoundException("Customer with SSN " + ssnId + " not found.");
        }
    }


    public ResponseEntity<TransactionResponse> withdraw(@PathVariable String ssnId, @RequestBody TransactionRequest request) {
        try {
            return transactionClient.withdraw(ssnId, request);
        } catch (FeignException.NotFound ex) {
            throw new ResourceNotFoundException("Customer with SSN " + ssnId + " not found.");
        }
    }

    public ResponseEntity<Boolean> transferFunds(@RequestBody TransferRequest request) {
        return transactionClient.transfer(request);
    }

    public ResponseEntity<List<TransactionResponse>> getTransactions(@PathVariable String ssnId) {
        try{
            return transactionClient.getTransactions(ssnId);
        }
        catch (FeignException.NotFound ex) {
            throw new ResourceNotFoundException("No Transactions found for " + ssnId);
        }
    }
}