package com.example.staff_sync;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController 
@RequestMapping("/api/departments") 
@CrossOrigin 
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
