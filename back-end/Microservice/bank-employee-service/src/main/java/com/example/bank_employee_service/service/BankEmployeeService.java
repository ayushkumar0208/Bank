package com.example.bank_employee_service.service;

import com.example.bank_employee_service.client.CustomerClient;
import com.example.bank_employee_service.client.TransactionClient;
import com.example.bank_employee_service.dto.CustomerDTO;
import com.example.bank_employee_service.dto.TransactionRequest;
import com.example.bank_employee_service.dto.TransferRequest;
import com.example.bank_employee_service.model.BankEmployee;
import com.example.bank_employee_service.repository.BankEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankEmployeeService {

    @Autowired
    private BankEmployeeRepository bankEmployeeRepository;

    @Autowired
    private CustomerClient customerClient;

    @Autowired
    private TransactionClient transactionClient;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Register a new bank employee
    public BankEmployee registerEmployee(BankEmployee employee) {
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        return bankEmployeeRepository.save(employee);
    }

    // ✅ Authenticate bank employee
    public BankEmployee authenticateEmployee(String userId, String password) {
        BankEmployee employee = bankEmployeeRepository.findByUserId(userId);
        return (employee != null && passwordEncoder.matches(password, employee.getPassword())) ? employee : null;
    }

    // ✅ Fetch all customers via CustomerClient
    public List<CustomerDTO> getAllCustomers() {
        return customerClient.getAllCustomers().getBody();
    }

    // ✅ Fetch customer by SSN ID
    public CustomerDTO getCustomerBySsnId(String ssnId) {
        return customerClient.getCustomerBySsnId(ssnId).getBody();
    }

    // ✅ Create customer
    public CustomerDTO createCustomer(CustomerDTO customer) {
        return customerClient.createCustomer(customer).getBody();
    }

    // ✅ Update customer
    public CustomerDTO updateCustomer(CustomerDTO customerDto) {
        return customerClient.updateCustomer(customerDto.getSsnId(), customerDto);
    }

    // ✅ Delete customer
    public void deleteCustomer(String ssnId) {
        customerClient.deleteCustomer(ssnId);
    }

    // ✅ Deposit
    public void deposit(String ssnId, double amount) {
        TransactionRequest request = new TransactionRequest();
        request.setAmount(amount);
        transactionClient.deposit(ssnId, request);
    }

    // ✅ Withdraw
    public void withdraw(String ssnId, double amount) {
        TransactionRequest request = new TransactionRequest();
        request.setAmount(amount);
        transactionClient.withdraw(ssnId, request);
    }

    // ✅ Transfer Funds
    public void transferFunds(String senderSsnId, String receiverSsnId, double amount) {
        TransferRequest request = new TransferRequest();
        request.setSenderSsnId(senderSsnId);
        request.setReceiverSsnId(receiverSsnId);
        request.setAmount(amount);
        transactionClient.transfer(request);
    }

    // ✅ Get all employees (for admin or internal use)
    public List<BankEmployee> getAllEmployees() {
        return bankEmployeeRepository.findAll();
    }
    
  
 // At the end of the class or appropriate place

    public BankEmployee getEmployeeByUserId(String userId) {
        return bankEmployeeRepository.findByUserId(userId);
    }

    public BankEmployee updateEmployee(String userId, BankEmployee updatedEmployee) {
        BankEmployee existing = bankEmployeeRepository.findByUserId(userId);
        if (existing == null) return null;
        existing.setFirstName(updatedEmployee.getFirstName());
        existing.setLastName(updatedEmployee.getLastName());
        existing.setEmail(updatedEmployee.getEmail());
        existing.setPassword(passwordEncoder.encode(updatedEmployee.getPassword()));
        existing.setPosition(updatedEmployee.getPosition());
        existing.setSalary(updatedEmployee.getSalary());
        existing.setPhoneNumber(updatedEmployee.getPhoneNumber());
        return bankEmployeeRepository.save(existing);
    }

    public void deleteEmployee(String userId) {
        BankEmployee employee = bankEmployeeRepository.findByUserId(userId);
        if (employee != null) {
            bankEmployeeRepository.delete(employee);
        }
    }
}