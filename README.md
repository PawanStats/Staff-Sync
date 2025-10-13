# Title :-Staff-Sync - Employee Management System

# ABSTRACT
          1) The Employee Management System  is designed as more than a full-stack web application to automate and streamline Human Resource (HR) operations within an organization. 
             The system's platform handles employee records, monitors attendance, processes leave requests, and generates automated payroll.
             
          2) The backend is developed through using Java Spring Boot along with MySQL as the database for secure data handling. 
             This also ensures data handling that is efficient. React is what the frontend utilizes,and it can provide a user-friendly interactive interface. 
             JWT-based authentication coupled with role-based access control (Admin, HR, Employee) enforce security by design.

# FEATURES
           Login System: Secure login with email and password.
           Employee Management: Add new employees with name, email, and department.
           Department Filtering: View employees by department or all employee
           Responsive Design: Works on mobile and desktop with a clean interface.
           Secure Backend: Uses MySQL to store data and JWT for authentication.

# TECHNOLOGY STACK 
           Frontend: HTML, JavaScript, Tailwind CSS
           Backend: Node.js, Express.js
           Database: MySQL
           Dependencies: express, mysql2, cors, bcrypt, jsonwebtoken

# Project Structure

                        staff-sync/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/staff_sync/
│   │   │       ├── StaffSyncApplication.java
│   │   │       ├── config/
│   │   │       │   └── SecurityConfig.java         # Added for authentication
│   │   │       ├── model/
│   │   │       │   ├── Department.java
│   │   │       │   ├── Employee.java
│   │   │       │   ├── Project.java
│   │   │       │   └── User.java                  # Added for user authentication
│   │   │       ├── controller/
│   │   │       │   ├── DepartmentController.java
│   │   │       │   ├── EmployeeController.java
│   │   │       │   ├── ProjectController.java
│   │   │       │   └── AuthController.java        # Added for login
│   │   │       ├── repository/
│   │   │       │   ├── DepartmentRepository.java
│   │   │       │   ├── EmployeeRepository.java
│   │   │       │   ├── ProjectRepository.java
│   │   │       │   └── UserRepository.java        # Added for user data
│   │   │       ├── service/
│   │   │       │   └── UserService.java           # Added for authentication logic
│   │   ├── resources/
│   │   │   ├── application.properties
│   │   │   ├── schema.sql
│   │   │   └── static/
│   │   │       ├── index.html
│   │   │       ├── login.html                     # Added for login page
│   │   │       ├── Employees.html
│   │   │       ├── Department.html
│   │   │       ├── Dashboard.html
│   │   │       ├── Reports.html
│   │   │       ├── navigation.js
│   │   │       ├── employee-fetcher.js
│   │   │       ├── dashboard-fetcher.js
│   │   │       ├── reports-fetcher.js
│   │   │       └── login.js                       # Added for login form handling
├── pom.xml
├── README.md                                      # To be created
               
                       
