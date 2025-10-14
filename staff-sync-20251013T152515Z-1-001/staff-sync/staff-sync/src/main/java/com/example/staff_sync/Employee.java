package com.example.staff_sync;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Represents an Employee entity in the database.
 * This structure is updated to include 'status' and 'salary' fields,
 * which are essential for report generation.
 */
@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;
    private String department;
    private String status; // Added for reporting (e.g., Active, On Leave)
    private Double salary; // Added for reporting

    /**
     * Default no-argument constructor. Required by JPA.
     */
    public Employee() {
    }

    /**
     * Convenience constructor for creating new employee instances (e.g., for demo data).
     */
    public Employee(String name, String role, String department, String status, Double salary) {
        this.name = name;
        this.role = role;
        this.department = department;
        this.status = status;
        this.salary = salary;
    }

    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
}
