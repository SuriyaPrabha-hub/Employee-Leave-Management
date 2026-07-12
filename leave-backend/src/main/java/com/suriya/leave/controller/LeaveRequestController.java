package com.suriya.leave.controller;

import com.suriya.leave.entity.LeaveRequest;
import com.suriya.leave.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leave")
@CrossOrigin(origins = "*")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService service;

    @PostMapping
    public LeaveRequest applyLeave(@RequestBody LeaveRequest leaveRequest) {
        return service.applyLeave(leaveRequest);
    }

    @GetMapping
    public List<LeaveRequest> getAllLeaves() {
        return service.getAllLeaves();
    }

    @PutMapping("/approve/{id}")
    public LeaveRequest approveLeave(@PathVariable Integer id) {
        return service.approveLeave(id);
    }

    @PutMapping("/pending/{id}")
    public LeaveRequest pendingLeave(@PathVariable Integer id) {
        return service.pendingLeave(id);
    }

    @PutMapping("/reject/{id}")
    public LeaveRequest rejectLeave(@PathVariable Integer id) {
        return service.rejectLeave(id);
    }

    @GetMapping("/history/{employeeId}")
    public List<LeaveRequest> getLeaveHistory(@PathVariable Integer employeeId) {
        return service.getLeaveHistory(employeeId);
    }
}