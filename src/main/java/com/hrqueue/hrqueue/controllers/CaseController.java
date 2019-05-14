package com.hrqueue.hrqueue.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CaseController {

    @GetMapping("/cases")
    @ResponseBody
    public String hello() {
        return "Cases";
    }


    @GetMapping("/create-case")
    @ResponseBody
    public String CreateCase() {
        return "Create a case";
    }

    @GetMapping("/customer-queue")
    @ResponseBody
    public String viewCustQueue() {
        return "View the customer queue";
    }


    @GetMapping("/case{id}")
    @ResponseBody
    public String editCase() {
        return "here the rep / admin can look at the case and edit it";
    }

    @GetMapping("/case{id}/delete")
    @ResponseBody
    public String deleteCase() {
        return "admin can delete a case.";
    }
}