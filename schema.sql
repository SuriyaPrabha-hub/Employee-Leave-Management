-- ======================================================
-- Employee Leave Management System - Database Schema
-- Database: MySQL 8.x / Compatible with Aiven Cloud MySQL
-- ======================================================

-- 1. Create and Use Database
CREATE DATABASE IF NOT EXISTS leave_management;
USE leave_management;

-- 2. Employee Table
CREATE TABLE IF NOT EXISTS employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'EMPLOYEE'
);

-- 3. Leave Request Table
CREATE TABLE IF NOT EXISTS leave_request (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    leave_type VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    CONSTRAINT fk_leave_employee 
        FOREIGN KEY (employee_id) 
        REFERENCES employee(id) 
        ON DELETE CASCADE
);

-- 4. Initial Seed Data
-- Default Admin Account (admin@gmail.com / admin123)
INSERT INTO employee (name, email, password, department, role)
VALUES ('Admin', 'admin@gmail.com', 'admin123', 'HR', 'ADMIN')
ON DUPLICATE KEY UPDATE role='ADMIN';

-- Default Admin Account (admin@leavehub.com / admin123)
INSERT INTO employee (name, email, password, department, role)
VALUES ('System Admin', 'admin@leavehub.com', 'admin123', 'Management', 'ADMIN')
ON DUPLICATE KEY UPDATE role='ADMIN';

-- Sample Employee
INSERT INTO employee (name, email, password, department, role)
VALUES ('Suriya', 'suriya@gmail.com', 'password123', 'IT', 'EMPLOYEE')
ON DUPLICATE KEY UPDATE role='EMPLOYEE';

-- Sample Leave Request
INSERT INTO leave_request (employee_id, leave_type, start_date, end_date, reason, status)
VALUES (3, 'Casual Leave', '2026-11-01', '2026-11-03', 'Family Function', 'PENDING');

-- 5. Helpful Verification Queries
-- View all employees:
-- SELECT id, name, email, department, role FROM employee;

-- View all leave requests:
-- SELECT * FROM leave_request;

-- View leave requests joined with employee names:
-- SELECT 
--     lr.id AS request_id,
--     e.name AS employee_name,
--     e.department,
--     lr.leave_type,
--     lr.start_date,
--     lr.end_date,
--     lr.reason,
--     lr.status
-- FROM leave_request lr
-- JOIN employee e ON lr.employee_id = e.id
-- ORDER BY lr.id DESC;
