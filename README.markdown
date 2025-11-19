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
Staff-Sync-main/
├── README.markdown
├── Staff-Sync/
│   └── staff-sync/
│       ├── package.json
│       └── staff-sync/
│           ├── HELP.md
│           ├── mvnw
│           ├── mvnw.cmd
│           ├── pom.xml
│           ├── src/
│           │   ├── main/
│           │   │   ├── java/
│           │   │   │   └── com/
│           │   │   │       └── example/
│           │   │   │           └── staff_sync/
│           │   │   │               ├── Department.java
│           │   │   │               ├── DepartmentController.java
│           │   │   │               ├── DepartmentRepository.java
│           │   │   │               ├── Employee.java
│           │   │   │               ├── EmployeeController.java
│           │   │   │               ├── EmployeeRepository.java
│           │   │   │               ├── Project.java
│           │   │   │               ├── ProjectController.java
│           │   │   │               ├── ProjectRepository.java
│           │   │   │               └── StaffSyncApplication.java
│           │   │   └── resources/
│           │   │       ├── application.properties
│           │   │       ├── schema.sql
│           │   │       └── static/
│           │   │           ├── dashboard-fetcher.js
│           │   │           ├── Dashboard.html
│           │   │           ├── Department.html
│           │   │           ├── employee-fetcher.js
│           │   │           ├── employee.json
│           │   │           ├── Employees.html
│           │   │           ├── index.html
│           │   │           ├── login.html
│           │   │           ├── login.js
│           │   │           ├── navigation.js
│           │   │           ├── package.json
│           │   │           ├── reports-fetcher.js
│           │   │           ├── Reports.html
│           │   │           └── server/
│           │   │               └── server.js
│           │   └── test/
│           │       └── java/
│           │           └── com/
│           │               └── example/
│           │                   └── staff_sync/
│           │                       └── StaffSyncApplicationTests.java
│           └── target/
│               ├── classes/
│               │   ├── application.properties
│               │   ├── schema.sql
│               │   ├── com/
│               │   │   └── example/
│               │   │       └── staff_sync/
│               │   └── static/
│               │       ├── dashboard-fetcher.js
│               │       ├── Dashboard.html
│               │       ├── Department.html
│               │       ├── employee-fetcher.js
│               │       ├── employee.json
│               │       ├── Employees.html
│               │       ├── index.html
│               │       ├── login.html
│               │       ├── login.js
│               │       ├── navigation.js
│               │       ├── package.json
│               │       ├── reports-fetcher.js
│               │       ├── Reports.html
│               │       └── server/
│               │           └── server.js
│               └── test-classes/
│                   └── com/
│                       └── example/
│                           └── staff_sync/

##License
For educational purposes, no specific license.
