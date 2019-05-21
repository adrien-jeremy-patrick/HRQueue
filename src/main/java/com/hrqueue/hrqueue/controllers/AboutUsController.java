package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.User;
import com.hrqueue.hrqueue.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AboutUsController {

    private final UserRepository userRepo;


    public AboutUsController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/about")

    public String about() {
        return "about";
    }
}