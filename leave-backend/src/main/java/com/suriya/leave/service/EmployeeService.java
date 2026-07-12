package com.suriya.leave.service;

import com.suriya.leave.entity.Employee;
import com.suriya.leave.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Add Employee
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Get All Employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Get Employee By ID
    public Optional<Employee> getEmployeeById(Integer id) {
        return employeeRepository.findById(id);
    }

    // Delete Employee
    public void deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
    }

    // Update Employee
    public Employee updateEmployee(Integer id, Employee employee) {

        Employee existing = employeeRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setName(employee.getName());
            existing.setEmail(employee.getEmail());
            existing.setPassword(employee.getPassword());
            existing.setDepartment(employee.getDepartment());
            existing.setRole(employee.getRole());

            return employeeRepository.save(existing);
        }

        return null;
    }

public Employee login(String email, String password) {

    Employee employee = employeeRepository.findByEmail(email);

    if (employee != null && employee.getPassword().equals(password)) {
        return employee;
    }

    return null;
}
public Employee changePassword(Integer id, String password) {

    Employee employee = employeeRepository.findById(id).orElse(null);

    if (employee != null) {
        employee.setPassword(password);
        return employeeRepository.save(employee);
    }

    return null;
}
}