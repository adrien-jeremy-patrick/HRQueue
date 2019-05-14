package com.hrqueue.hrqueue.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CategoryController {

    @GetMapping("/categories")
    @ResponseBody
    public String hello() {
        return "Categories";
    }
}

