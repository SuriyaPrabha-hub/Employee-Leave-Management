package com.suriya.leave.controller;

import com.suriya.leave.entity.Employee;
import com.suriya.leave.service.EmployeeService;
import com.suriya.leave.dto.LoginRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;


    // Add Employee
    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeService.saveEmployee(employee);
    }


    // Get All Employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }


    // Get Employee By ID
    @GetMapping("/get/{id}")
    public Optional<Employee> getEmployeeById(
            @PathVariable Integer id) {

        return employeeService.getEmployeeById(id);
    }


    // Update Employee
    @PutMapping("/update/{id}")
    public Employee updateEmployee(
            @PathVariable Integer id,
            @RequestBody Employee employee) {

        return employeeService.updateEmployee(id, employee);
    }


    // Delete Employee
    @DeleteMapping("/delete/{id}")
    public String deleteEmployee(
            @PathVariable Integer id) {

        employeeService.deleteEmployee(id);

        return "Employee Deleted Successfully";
    }


    // Login Employee
    @PostMapping("/login")
    public Employee login(
            @RequestBody LoginRequest request) {

        return employeeService.login(
                request.getEmail(),
                request.getPassword()
        );
    }


    // Register Employee
    @PostMapping("/register")
    public Employee register(
            @RequestBody Employee employee) {

        employee.setRole("EMPLOYEE");

        return employeeService.saveEmployee(employee);
    }


    // Change Password
    @PutMapping("/changePassword/{id}")
    public Employee changePassword(
            @PathVariable Integer id,
            @RequestBody Employee employee) {

        return employeeService.changePassword(
                id,
                employee.getPassword()
        );
    }
}
