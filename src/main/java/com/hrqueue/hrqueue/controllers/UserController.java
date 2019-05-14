package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {
    public final UserRepository usersRepo;

    public UserController(UserRepository usersRepo) {
        this.usersRepo = usersRepo;
    }

    @GetMapping("/rep-dashboard")
    @ResponseBody
    public String showRepDash() {
        return "This is the HR Rep dashboard. The available cases will be on this page";
    }

    @GetMapping("/admin-dashboard")
    @ResponseBody
    public String showAdminDash() {
        return "This is the admin dashboard The available cases will be ont this page.";
    }

    @GetMapping("/user/{id}/edit")
    @ResponseBody
    public String showUserEdit() {
        return "This is where the the rep or admin can edit profiles";
    }



}
