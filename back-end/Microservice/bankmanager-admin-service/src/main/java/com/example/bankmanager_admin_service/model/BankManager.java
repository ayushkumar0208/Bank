package com.example.bankmanager_admin_service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bank_managers")
public class BankManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for each manager (auto-generated)

    @Column(unique = true, nullable = false)
    private String userId; // Manager's unique user ID

    @Column(nullable = false)
    private String firstName; // First name of the manager

    @Column(nullable = false)
    private String lastName; // Last name of the manager

    @Column(unique = true, nullable = false)
    private String email; // Email address of the manager

    @Column(nullable = false)
    private String password; // Encrypted password for the manager

    // Default Constructor
    public BankManager() {}

    // Parameterized Constructor
    public BankManager(String userId, String firstName, String lastName, String email, String password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
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
}