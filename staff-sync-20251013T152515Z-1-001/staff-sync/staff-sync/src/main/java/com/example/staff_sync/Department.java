package com.example.staff_sync;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * Department - The JPA Entity for the 'department' table.
 * This file defines the data structure for a department record.
 * @Entity is crucial for Spring/Hibernate to map this class to a database table.
 */
@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String manager;
    private Long budget;
    private Integer headcount;

    // Required by JPA/Hibernate
    public Department() {
    }

    // --- Getters and Setters (Essential for serialization and data access) ---

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

    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    public Long getBudget() {
        return budget;
    }

    public void setBudget(Long budget) {
        this.budget = budget;
    }

    public Integer getHeadcount() {
        return headcount;
    }

    public void setHeadcount(Integer headcount) {
        this.headcount = headcount;
    }
}
