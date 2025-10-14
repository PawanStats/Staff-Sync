package com.example.staff_sync;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * DepartmentRepository - The Spring Data JPA repository for Department entities.
 *
 * It extends JpaRepository, which automatically provides standard database access
 * methods (like save(), findAll(), findById(), etc.) without needing to write
 * any method bodies or SQL.
 *
 * @Repository marks this interface as a Spring Data repository, making it available
 * for injection into your controllers (e.g., DepartmentController).
 *
 * The two generic parameters are:
 * 1. Department: The Entity class this repository manages.
 * 2. Long: The data type of the Department entity's primary key (the 'id' field).
 */
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    // Custom query methods can be defined here, but for basic Add/Fetch,
    // the methods inherited from JpaRepository are sufficient.
}
