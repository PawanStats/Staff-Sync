package com.example.staff_sync;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST Controller for managing project/report data API requests.
 * Mapped to the /api/projects endpoint.
 */
@RestController
@RequestMapping("/api/projects")
@CrossOrigin // Enable CORS for frontend communication
public class ProjectController {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    /**
     * Handles HTTP GET requests to retrieve all projects with optional filtering.
     * @param status Optional filter by project status.
     * @param department Optional filter by department name.
     * @return A list of filtered Project objects.
     */
    @GetMapping
    public List<Project> getAllProjects(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String department) {
        List<Project> projects = projectRepository.findAll();
        return projects.stream()
                .filter(p -> status == null || status.isEmpty() || p.getStatus().equalsIgnoreCase(status))
                .filter(p -> department == null || department.isEmpty() || p.getDepartment() != null && p.getDepartment().equalsIgnoreCase(department))
                .collect(Collectors.toList());
    }

    /**
     * Handles HTTP POST requests to create a new project.
     * @param project The Project object sent in the request body.
     * @return The saved Project object with its generated ID.
     */
    @PostMapping
    public Project addProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }
}