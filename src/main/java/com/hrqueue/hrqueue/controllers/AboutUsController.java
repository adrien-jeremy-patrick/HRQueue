package com.hrqueue.hrqueue.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AboutUsController {

    @GetMapping("/about")
    @ResponseBody
    public String hello() {
        return "This is our timeline of events with pictures we take and our dev portfolio section";
    }
}