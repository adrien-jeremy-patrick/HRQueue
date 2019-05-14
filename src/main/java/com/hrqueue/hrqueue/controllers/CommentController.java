package com.hrqueue.hrqueue.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CommentController {

    @GetMapping("/comments")
    @ResponseBody
    public String hello() {
        return "Comments";
    }
}
