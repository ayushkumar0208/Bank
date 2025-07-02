package com.example.bankmanager_admin_service.service;

import com.example.bankmanager_admin_service.client.CustomerClient;
import com.example.bankmanager_admin_service.client.BankEmployeeClient;
import com.example.bankmanager_admin_service.dto.BankEmployeeDTO;
import com.example.bankmanager_admin_service.dto.CustomerDTO;
import com.example.bankmanager_admin_service.exception.ResourceNotFoundException;
import com.example.bankmanager_admin_service.model.BankManager;
import com.example.bankmanager_admin_service.repository.BankManagerRepository;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankManagerService {

    @Autowired
    private BankManagerRepository bankManagerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerClient customerClient;

    @Autowired
    private BankEmployeeClient bankEmployeeClient;

    // ✅ Manager login
    public BankManager login(String userId, String password) {
        BankManager manager = bankManagerRepository.findByUserId(userId);
        if (manager == null || !passwordEncoder.matches(password, manager.getPassword())) {
            throw new RuntimeException("Invalid User ID or Password");
        }
        return manager;
    }

    // ✅ Create manager
    public BankManager createManager(BankManager manager) {
        manager.setPassword(passwordEncoder.encode(manager.getPassword()));
        return bankManagerRepository.save(manager);
    }

    // ✅ Customer operations via Feign
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

    public CustomerDTO createCustomer(CustomerDTO customer) {
        return customerClient.createCustomer(customer).getBody();
    }

    public CustomerDTO updateCustomer(String ssnId, CustomerDTO updatedCustomer) {
        return customerClient.updateCustomer(ssnId, updatedCustomer).getBody();
    }

    public void deleteCustomer(String ssnId) {
        try {
            customerClient.deleteCustomer(ssnId);
        } catch (FeignException.NotFound ex) {
            throw new ResourceNotFoundException("Customer with SSN " + ssnId + " not found.");
        }
    }

    // ✅ Employee operations via Feign
    public List<BankEmployeeDTO> getAllEmployees() {
        return bankEmployeeClient.getAllEmployees().getBody();
    }

    public BankEmployeeDTO getEmployeeByUserId(String userId) {
        try {
            return bankEmployeeClient.getEmployeeByUserId(userId).getBody();
        } catch (FeignException.NotFound ex) {
            throw new ResourceNotFoundException("Customer with SSN " + userId + " not found.");
        }

    }

    public BankEmployeeDTO createEmployee(BankEmployeeDTO employee) {
        return bankEmployeeClient.createEmployee(employee).getBody();
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
}