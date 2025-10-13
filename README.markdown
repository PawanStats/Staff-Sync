# StaffSync - Employee Management System

StaffSync is a web application for managing employees, departments, and projects. It features a secure login system, employee management, and department filtering, built with Spring Boot and MySQL for the backend and HTML/JavaScript with Tailwind CSS for the frontend.

## Features
- **Secure Login**: Authenticate users with email and password.
- **Employee Management**: Add, view, and filter employees by department.
- **Department Management**: View departments and associated employees.
- **Responsive UI**: Mobile-friendly interface with Tailwind CSS.
- **Secure Backend**: Uses Spring Boot, MySQL, and JWT for authentication.

## Tech Stack
- **Frontend**: HTML, JavaScript, Tailwind CSS
- **Backend**: Spring Boot, Java, Spring Data JPA
- **Database**: MySQL
- **Dependencies**: Spring Boot Starter Web, Spring Security, MySQL Connector, Lombok, JJWT

## Project Structure
```
staff-sync/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/staff_sync/
│   │   │       ├── StaffSyncApplication.java      # Main Spring Boot application
│   │   │       ├── config/
│   │   │       │   └── SecurityConfig.java       # Security configuration for JWT
│   │   │       ├── model/
│   │   │       │   ├── Department.java           # Department entity
│   │   │       │   ├── Employee.java             # Employee entity
│   │   │       │   ├── Project.java              # Project entity
│   │   │       │   └── User.java                 # User entity for authentication
│   │   │       ├── controller/
│   │   │       │   ├── DepartmentController.java # REST API for departments
│   │   │       │   ├── EmployeeController.java   # REST API for employees
│   │   │       │   ├── ProjectController.java    # REST API for projects
│   │   │       │   └── AuthController.java       # REST API for login
│   │   │       ├── repository/
│   │   │       │   ├── DepartmentRepository.java # JPA repository for departments
│   │   │       │   ├── EmployeeRepository.java   # JPA repository for employees
│   │   │       │   ├── ProjectRepository.java    # JPA repository for projects
│   │   │       │   └── UserRepository.java       # JPA repository for users
│   │   │       ├── service/
│   │   │       │   └── UserService.java          # Service for authentication logic
│   │   ├── resources/
│   │   │   ├── application.properties            # Spring Boot configuration
│   │   │   ├── schema.sql                        # Database schema
│   │   │   └── static/
│   │   │       ├── index.html                    # Landing page
│   │   │       ├── login.html                    # Login page
│   │   │       ├── Employees.html                # Employee management page
│   │   │       ├── Department.html               # Department page
│   │   │       ├── Dashboard.html                # Dashboard page
│   │   │       ├── Reports.html                  # Reports page
│   │   │       ├── navigation.js                 # Navigation and auth checks
│   │   │       ├── employee-fetcher.js           # Employee data handling
│   │   │       ├── dashboard-fetcher.js          # Dashboard data handling
│   │   │       ├── reports-fetcher.js            # Reports data handling
│   │   │       └── login.js                      # Login form handling
├── pom.xml                                       # Maven dependencies
├── README.md                                     # Project documentation
```


## License
For educational purposes, no specific license.
