package com.example.customer_transaction_loan_service.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "customers") // Define a specific table name in the database
public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the customer (auto-generated)

    @Column(unique = true, nullable = false)
    private String ssnId; // Social Security Number (unique and mandatory)

    @Column(nullable = false)
    private String firstName; // First name of the customer (mandatory)

    @Column(nullable = false)
    private String lastName; // Last name of the customer (mandatory)

    @Column(unique = true, nullable = false)
    private String email; // Email (unique and mandatory)

    @Column(nullable = false)
    private String password; // Password (mandatory)

    @Column(unique = true, nullable = false)
    private String contactNumber; // Contact number

    private LocalDate dob; // Date of birth

    private String gender; // Gender of the customer

    private String maritalStatus; // Marital status

    private String address; // Address
    
    @Column(unique = true, nullable = false)
    private String panCardNumber; // PAN card number

    @Column(unique = true, nullable = false)
    private String aadharCardNumber; // Aadhar card number

    @Column(nullable = false)
    private String ifscCode; // IFSC code for the customer's account (mandatory)

    @Column(nullable = false)
    private double accountBalance; // Account balance (mandatory)

    private boolean isCustomerVerified; // Verification status of the customer

    // Default Constructor
    public CustomerEntity() {
    }

    // Parameterized Constructor
    public CustomerEntity(Long id, String ssnId, String firstName, String lastName, String email, String password,
                          String contactNumber, LocalDate dob, String gender, String maritalStatus, String address,
                          String panCardNumber, String aadharCardNumber, String ifscCode, double accountBalance,
                          boolean isCustomerVerified) {
        this.id = id;
        this.ssnId = ssnId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contactNumber = contactNumber;
        this.dob = dob;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.address = address;
        this.panCardNumber = panCardNumber;
        this.aadharCardNumber = aadharCardNumber;
        this.ifscCode = ifscCode;
        this.accountBalance = accountBalance;
        this.isCustomerVerified = isCustomerVerified;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSsnId() {
        return ssnId;
    }

    public void setSsnId(String ssnId) {
        this.ssnId = ssnId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPanCardNumber() {
        return panCardNumber;
    }

    public void setPanCardNumber(String panCardNumber) {
        this.panCardNumber = panCardNumber;
    }

    public String getAadharCardNumber() {
        return aadharCardNumber;
    }

    public void setAadharCardNumber(String aadharCardNumber) {
        this.aadharCardNumber = aadharCardNumber;
    }

    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }

    public double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(double accountBalance) {
        this.accountBalance = accountBalance;
    }

    public boolean isCustomerVerified() {
        return isCustomerVerified;
    }

    public void setCustomerVerified(boolean customerVerified) {
        isCustomerVerified = customerVerified;
    }
}