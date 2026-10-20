package com.suriya.leave;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.suriya.leave.entity.Employee;
import com.suriya.leave.repository.EmployeeRepository;

@SpringBootApplication
public class LeaveApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeaveApplication.class, args);
	}

	@Bean
	CommandLineRunner initAdmin(EmployeeRepository employeeRepository) {
		return args -> {
			if (employeeRepository.findByEmail("admin@leavehub.com") == null) {
				Employee admin = new Employee();
				admin.setName("System Admin");
				admin.setEmail("admin@leavehub.com");
				admin.setPassword("admin123");
				admin.setDepartment("Management");
				admin.setRole("ADMIN");
				employeeRepository.save(admin);
			}
		};
	}

}
