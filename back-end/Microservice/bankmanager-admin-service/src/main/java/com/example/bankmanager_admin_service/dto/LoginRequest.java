package com.example.bankmanager_admin_service.dto;

public class LoginRequest {
    private String ssnId;
    private String password;

    public String getSsnId() {
        return ssnId;
    }

    public void setSsnId(String ssnId) {
        this.ssnId = ssnId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}