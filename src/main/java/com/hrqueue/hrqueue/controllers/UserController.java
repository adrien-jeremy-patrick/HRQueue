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

    public String showRepDash() {
        return "reps/rep-dashboard";
    }

    @GetMapping("/admin-dashboard")

    public String showAdminDash() {
        return "reps/admin-dashboard";
    }

    @GetMapping("/user/{id}/edit")

    public String showUserEdit() {
        return "reps/user-edit";
    }



}
