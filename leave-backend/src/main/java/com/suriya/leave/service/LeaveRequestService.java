package com.suriya.leave.service;

import com.suriya.leave.entity.LeaveRequest;
import com.suriya.leave.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository repository;

    public LeaveRequest applyLeave(LeaveRequest leaveRequest) {
        leaveRequest.setStatus("Pending");
        return repository.save(leaveRequest);
    }

    public List<LeaveRequest> getAllLeaves() {
        return repository.findAll();
    }

    public LeaveRequest approveLeave(Integer id) {
        LeaveRequest leave = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Leave request not found"));

        leave.setStatus("Approved");
        return repository.save(leave);
    }

    public LeaveRequest pendingLeave(Integer id) {
        LeaveRequest leave = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Leave request not found"));

        leave.setStatus("Pending");
        return repository.save(leave);
    }

    public LeaveRequest rejectLeave(Integer id) {
        LeaveRequest leave = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Leave request not found"));

        leave.setStatus("Rejected");
        return repository.save(leave);
    }

    public List<LeaveRequest> getLeaveHistory(Integer employeeId) {
        return repository.findByEmployeeId(employeeId);
    }
}