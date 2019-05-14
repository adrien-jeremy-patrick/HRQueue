package com.hrqueue.hrqueue.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LandingPageController {

    @GetMapping("/home")
    @ResponseBody
    public String hello() {
        return "This is where the landing page will go.";
    }
}
