package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.User;
import com.hrqueue.hrqueue.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthenticationController {

    private UserRepository userRepository;

    public AuthenticationController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "users/login";
    }

    @GetMapping("/logout")
    public String showLogoutMessage() {
        return "users/logout";
    }



}



