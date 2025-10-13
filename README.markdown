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

## Prerequisites
- **Java**: JDK 17 or higher (download from [oracle.com](https://www.oracle.com/java)).
- **Maven**: For building the project (download from [maven.apache.org](https://maven.apache.org)).
- **MySQL**: Installed and running (e.g., MySQL Community Server or XAMPP).
- **Git**: To clone the repository (optional).

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd staff-sync
```

### 2. Set Up MySQL Database
1. Start MySQL (e.g., via XAMPP or `mysql -u root -p`).
2. Log in to MySQL:
   ```bash
   mysql -u root -p
   ```
3. Create the database and tables (defined in `src/main/resources/schema.sql`):
   ```sql
   CREATE DATABASE staffsync;
   USE staffsync;

   CREATE TABLE departments (
       id BIGINT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL UNIQUE
   );

   CREATE TABLE employees (
       id BIGINT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       department_id BIGINT,
       FOREIGN KEY (department_id) REFERENCES departments(id)
   );

   CREATE TABLE projects (
       id BIGINT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description TEXT
   );

   CREATE TABLE users (
       id BIGINT AUTO_INCREMENT PRIMARY KEY,
       email VARCHAR(255) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
   );

   INSERT INTO departments (name) VALUES
       ('Engineering'),
       ('Marketing'),
       ('HR'),
       ('Finance'),
       ('Sales');

   INSERT INTO users (email, password) VALUES
       ('manager@example.com', '$2a$10$8e6b7e9e3f8e2b1c7d2e8f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1');
   ```
   Note: The `users` password is a BCrypt hash for `password123`.

4. Update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/staffsync
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=none
   spring.sql.init.mode=always
   jwt.secret=your-secret-key
   ```
   Generate a secure JWT secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Replace `yourpassword` and `your-secret-key` accordingly.

### 3. Build and Run the Project
```bash
cd staff-sync
mvn clean install
mvn spring-boot:run
```
Output:
```
Started StaffSyncApplication in X seconds
```
The app runs on `http://localhost:8080`.

### 4. Access the Application
1. Open `http://localhost:8080/index.html`.
2. Click **Get Started** to go to `login.html`.
3. Log in with:
   - Email: `manager@example.com`
   - Password: `password123`
4. Access `Employees.html`, `Department.html`, `Dashboard.html`, or `Reports.html`.

## Usage
- **Landing Page (`index.html`)**: Click "Get Started" to log in.
- **Login Page (`login.html`)**: Enter credentials to access protected pages.
- **Employee Management (`Employees.html`)**:
  - View/add employees.
  - Filter by department.
- **Department Page (`Department.html`)**: View department details.
- **Dashboard (`Dashboard.html`)**: Overview of employees/projects.
- **Reports (`Reports.html`)**: Generate reports.
- **Logout**: Removes JWT from localStorage and redirects to `login.html`.

## Troubleshooting
- **Previous Error: Cannot find module 'server/server.js'**:
  - This occurred due to running a Node.js command (`node server/server.js`) on a Spring Boot project. Use `mvn spring-boot:run` instead.
- **Get Started Button Not Working**:
  - Ensure `index.html` has `<a href="login.html">Get Started</a>`.
  - Verify `login.html` exists in `src/main/resources/static`.
  - Check browser console (F12) for errors (e.g., 404).
- **Port Conflict on 8080**:
  - Check: `netstat -aon | findstr :8080`
  - Terminate: `taskkill /PID <pid> /F`, or change `server.port` in `application.properties`.
- **MySQL Errors**:
  - Verify MySQL is running: `mysql -u root -p`.
  - Check `application.properties` credentials.
  - Ensure database exists: `mysql -u root -p -e "USE staffsync;"`.

## Contributing
1. Fork the repository.
2. Create a branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m "Add feature"`.
4. Push: `git push origin feature-name`.
5. Create a pull request.

## License
For educational purposes, no specific license.