package com.example.bankmanager_admin_service.dto;

import java.time.LocalDate;

public class CustomerDTO {

    private Long id;
    private String ssnId;  // Added for mapping and operations by SSN
    private String firstName;
    private String lastName;
    private String email;
    private String password; // Password (mandatory)
    private String contactNumber;
    private LocalDate dob;
    private String gender;
    private String maritalStatus;
    private String address;
    private String panCardNumber;
    private String aadharCardNumber;
    private String ifscCode;
    private double accountBalance;
    private boolean isCustomerVerified;

    // Default constructor
    public CustomerDTO() {}

    // Full constructor

    public CustomerDTO(Long id, String ssnId, String firstName, String lastName, String email, String password, String contactNumber, LocalDate dob, String gender, String maritalStatus, String address, String panCardNumber, String aadharCardNumber, String ifscCode, double accountBalance, boolean isCustomerVerified) {
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