package com.studentportal.backend.dto;

public class AuthRequest {
    private String studentId;
    private String password;

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
