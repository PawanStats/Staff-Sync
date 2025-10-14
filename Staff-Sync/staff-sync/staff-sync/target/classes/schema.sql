-- Drop tables in reverse order of creation to avoid foreign key issues (good practice)
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS employee;

-- 1. Employee Table (Existing, with latest contact/status fields)
CREATE TABLE employee (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    contact VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Active'
);

-- 2. Department Table
CREATE TABLE department (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    manager VARCHAR(255),
    budget DOUBLE,
    headcount INT DEFAULT 0
);

-- 3. Project/Report Table (Data for Dashboard and Reports pages)
CREATE TABLE project (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    status VARCHAR(50) DEFAULT 'In Progress',
    priority VARCHAR(50) DEFAULT 'Medium',
    due_date DATE,
    description TEXT
);
