package com.example.staff_sync;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * This is the Repository interface for the Employee entity.
 * It provides standard database operations (like findAll) via Spring Data JPA.
 */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Spring Data JPA automatically provides method implementations here (e.g., findAll(), save()).
}
