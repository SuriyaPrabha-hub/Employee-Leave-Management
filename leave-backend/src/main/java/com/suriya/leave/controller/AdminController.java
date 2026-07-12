package com.suriya.leave.controller;

import com.suriya.leave.dto.DashboardResponse;
import com.suriya.leave.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService service;

    @GetMapping("/dashboard")
    public DashboardResponse dashboard() {

        return service.getDashboard();

    }
}