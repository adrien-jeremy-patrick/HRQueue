package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.repositories.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {
    public final UserRepository usersRepo;

    public UserController(UserRepository usersRepo) {
        this.usersRepo = usersRepo;
    }

    @GetMapping("/rep-admin-login")

    public String showAdminDash() {
        return "users/login";
    }

    @GetMapping("/rep-admin-dashboard")

    public String showRepDash() {
        return "users/rep-admin-dashboard";
    }

    @GetMapping("/user/{id}/edit")

    public String showUserEdit() {
        return "users/user-edit";
    }





}
