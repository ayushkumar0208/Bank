package com.example.bank_employee_service.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bank_employees")
public class BankEmployee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for each employee (auto-generated)

    @Column(unique = true, nullable = false)
    private String userId; // Employee's unique user ID (auto-generated and must be alphanumeric)

    @Column(nullable = false)
    private String firstName; // First name of the employee

    @Column(nullable = false)
    private String lastName; // Last name of the employee

    @Column(unique = true, nullable = false)
    private String email; // Email address of the employee

    @Column(nullable = false)
    private String password; // Encrypted password for the employee

    @Column(nullable = false)
    private String position; // Position or designation of the employee

    private double salary; // Employee's salary

    private LocalDate dateOfJoining; // Date the employee joined

    @Column(unique = true, nullable = false)
    private String phoneNumber; // Contact number of the employee

    // Default constructor
    public BankEmployee() {
    }

    // Parameterized constructor
    public BankEmployee(String userId, String firstName, String lastName, String email, String password,
                        String position, double salary, LocalDate dateOfJoining, String phoneNumber) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.position = position;
        this.salary = salary;
        this.dateOfJoining = dateOfJoining;
        this.phoneNumber = phoneNumber;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public LocalDate getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(LocalDate dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}