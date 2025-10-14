package com.example.staff_sync;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * DepartmentController - REST Controller to handle API requests for departments.
 *
 * This class is responsible for exposing the endpoints used by the frontend
 * (Department.html) to create new departments (POST) and retrieve the list of all departments (GET).
 */
@RestController // Marks this class as a REST Controller
@RequestMapping("/api/departments") // Sets the base URL path for all methods in this controller
@CrossOrigin // Essential for allowing the frontend HTML pages to communicate with this API
public class DepartmentController {

    private final DepartmentRepository departmentRepository;

    /**
     * Constructor-based Dependency Injection.
     * Spring automatically injects an instance of the DepartmentRepository.
     *
     * @param departmentRepository The repository for accessing department data.
     */
    @Autowired
    public DepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    /**
     * Handles HTTP POST requests to /api/departments.
     * Used to add a new department to the database.
     *
     * @param department The Department object received from the frontend as JSON in the request body.
     * @return The saved Department object, including the newly generated database ID.
     */
    @PostMapping
    public Department createDepartment(@RequestBody Department department) {
        // The save() method is provided by JpaRepository via the DepartmentRepository interface.
        return departmentRepository.save(department);
    }

    /**
     * Handles HTTP GET requests to /api/departments.
     * Used to fetch all departments from the database.
     *
     * @return A List of all Department objects, which Spring automatically converts to a JSON array.
     */
    @GetMapping
    public List<Department> getAllDepartments() {
        // The findAll() method is provided by JpaRepository.
        return departmentRepository.findAll();
    }
}
