package com.example.staff_sync;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for the Project entity.
 * Provides standard CRUD operations for projects.
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    // Custom query methods can be defined here, e.g., List<Project> findByStatus(String status);
}
