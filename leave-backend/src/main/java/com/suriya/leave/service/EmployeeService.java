package com.suriya.leave.service;

import com.suriya.leave.entity.Employee;
import com.suriya.leave.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Add Employee
    public Employee saveEmployee(Employee employee) {
        // Check for duplicate email before saving
        if (employeeRepository.findByEmail(employee.getEmail()) != null) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Email already registered. Please use a different email.");
        }
        return employeeRepository.save(employee);
    }

    // Get All Employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get Employee By ID
    public Employee getEmployeeById(Integer id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Employee not found"));
    }

    // Delete Employee
    public void deleteEmployee(Integer id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Employee not found");
        }
        employeeRepository.deleteById(id);
    }

    // Update Employee (preserves password if not provided)
    public Employee updateEmployee(Integer id, Employee employee) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Employee not found"));

        // Check if new email already used by another employee
        Employee emailOwner = employeeRepository.findByEmail(employee.getEmail());
        if (emailOwner != null && !emailOwner.getId().equals(id)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Email already in use by another employee.");
        }

        existing.setName(employee.getName());
        existing.setEmail(employee.getEmail());
        existing.setDepartment(employee.getDepartment());
        existing.setRole(employee.getRole());

        // Only update password if explicitly provided
        if (employee.getPassword() != null && !employee.getPassword().isEmpty()) {
            existing.setPassword(employee.getPassword());
        }

        return employeeRepository.save(existing);
    }

    // Login
    public Employee login(String email, String password) {
        Employee employee = employeeRepository.findByEmail(email);

        if (employee != null && employee.getPassword().equals(password)) {
            return employee;
        }

        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    // Change Password — verifies current password first
    public Employee changePassword(Integer id, String currentPassword, String newPassword) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Employee not found"));

        // Verify current password
        if (!employee.getPassword().equals(currentPassword)) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Current password is incorrect");
        }

        if (newPassword == null || newPassword.length() < 4) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "New password must be at least 4 characters");
        }

        employee.setPassword(newPassword);
        return employeeRepository.save(employee);
    }
}