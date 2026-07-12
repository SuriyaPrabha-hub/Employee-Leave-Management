package com.suriya.leave.service;

import com.suriya.leave.dto.DashboardResponse;
import com.suriya.leave.repository.EmployeeRepository;
import com.suriya.leave.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private LeaveRequestRepository leaveRepository;

    public DashboardResponse getDashboard() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalEmployees(employeeRepository.count());

        response.setTotalLeaves(leaveRepository.count());

        response.setPendingLeaves(
                leaveRepository.countByStatus("Pending"));

        response.setApprovedLeaves(
                leaveRepository.countByStatus("Approved"));

        response.setRejectedLeaves(
                leaveRepository.countByStatus("Rejected"));

        return response;
    }
}