package com.hrqueue.hrqueue.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthenticationController {

    @GetMapping("/rep-admin-login")
    public String showLoginForm() {
        return "users/login";
    }

    @GetMapping("/rep-admin-logout")
    public String showLogoutMessage() {
        return "users/logout";
    }


}



