package com.example.customer_transaction_loan_service.service;

import com.example.customer_transaction_loan_service.model.CustomerEntity;
import com.example.customer_transaction_loan_service.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List; // ✅ Correct import

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repository;

    public CustomerEntity registerCustomer(CustomerEntity customer) {
        return repository.save(customer);
    }

    public CustomerEntity findBySsnId(String ssnId) {
        return repository.findBySsnId(ssnId);
    }

    public List<CustomerEntity> getAllCustomers() {
        return repository.findAll(); // ✅ Fix
    }

    public CustomerEntity updateCustomer(CustomerEntity updatedCustomer) {
        CustomerEntity existingCustomer = repository.findBySsnId(updatedCustomer.getSsnId());
        if (existingCustomer == null) {
            throw new ResourceNotFoundException("Customer with SSN ID " + updatedCustomer.getSsnId() + " not found");
        }

        // Update fields
        existingCustomer.setFirstName(updatedCustomer.getFirstName());
        existingCustomer.setLastName(updatedCustomer.getLastName());
        existingCustomer.setEmail(updatedCustomer.getEmail());
        existingCustomer.setPassword(updatedCustomer.getPassword());
        existingCustomer.setContactNumber(updatedCustomer.getContactNumber());
        existingCustomer.setDob(updatedCustomer.getDob());
        existingCustomer.setGender(updatedCustomer.getGender());
        existingCustomer.setMaritalStatus(updatedCustomer.getMaritalStatus());
        existingCustomer.setAddress(updatedCustomer.getAddress());
        existingCustomer.setPanCardNumber(updatedCustomer.getPanCardNumber());
        existingCustomer.setAadharCardNumber(updatedCustomer.getAadharCardNumber());
        existingCustomer.setIfscCode(updatedCustomer.getIfscCode());
        existingCustomer.setAccountBalance(updatedCustomer.getAccountBalance());
        existingCustomer.setCustomerVerified(updatedCustomer.isCustomerVerified());

        return repository.save(existingCustomer);
    }

    public void deleteCustomer(String id) {
        CustomerEntity customer = repository.findBySsnId(id);
        if (customer != null) {
            repository.delete(customer);
        } else {
            throw new ResourceNotFoundException("Customer with SSN ID " + id + " not found");
        }
    }

    public CustomerEntity login(String ssnId, String password) {
        CustomerEntity customer = repository.findBySsnId(ssnId);
        if (customer != null && customer.getPassword().equals(password)) {
            return customer;
        }
        return null;
    }
}