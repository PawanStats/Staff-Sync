package com.example.staff_sync;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for handling employee data API requests.
 * The GET method is updated to allow filtering the employee list
 * based on query parameters provided by the frontend.
 */
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /**
     * Handles HTTP GET requests to "/api/employees".
     * Allows optional filtering by role, department, and status using @RequestParam.
     *
     * @param role Optional filter by employee role.
     * @param department Optional filter by department name.
     * @param status Optional filter by employment status.
     * @return A List of filtered Employee objects.
     */
    @GetMapping
    public List<Employee> getFilteredEmployees(
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String status) {

        List<Employee> allEmployees = employeeRepository.findAll();

        return allEmployees.stream()
                // Filter by Role (case-insensitive check)
                .filter(e -> role == null || role.isEmpty() || e.getRole().equalsIgnoreCase(role))
                // Filter by Department (case-insensitive check)
                .filter(e -> department == null || department.isEmpty() || e.getDepartment().equalsIgnoreCase(department))
                // Filter by Status (case-insensitive check)
                .filter(e -> status == null || status.isEmpty() || e.getStatus().equalsIgnoreCase(status))
                .collect(Collectors.toList());
    }
}
