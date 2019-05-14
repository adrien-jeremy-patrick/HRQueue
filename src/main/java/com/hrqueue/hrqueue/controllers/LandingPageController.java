package com.hrqueue.hrqueue.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LandingPageController {

    @GetMapping("/home")
    public String hello() {
        return "jeremy-test-file";
    }
}
