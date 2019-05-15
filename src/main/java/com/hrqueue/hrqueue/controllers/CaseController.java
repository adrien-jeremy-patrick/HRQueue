package com.hrqueue.hrqueue.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CaseController {

    @GetMapping("/cases")

    public String cases() {
        return "cases/cases";
    }


    @GetMapping("/create-case")

    public String CreateCase() {
        return "cases/create-case";
    }

    @GetMapping("/customer-queue")

    public String viewCustQueue() {
        return "cases/customer-queue";
    }


    @GetMapping("/case{id}")

    public String editCase() {
        return "cases/case";
    }

    @GetMapping("/case{id}/delete")

    public String deleteCase() {
        return "cases/cases";
    }

    @GetMapping("/reports")

    public String viewReports() {
        return "cases/reports";
    }
}