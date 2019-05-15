package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.Case;
import com.hrqueue.hrqueue.repositories.CaseRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Calendar;
import java.util.Date;

@Controller
public class CaseController {

    private final CaseRepository caseRepo;

    public CaseController(CaseRepository caseRepo) {
        this.caseRepo = caseRepo;
    }

    @GetMapping("/cases")

    public String cases() {
        return "cases/cases";
    }


    @GetMapping("/create-case")
    public String CreateCase(Model model) {
        model.addAttribute("case",new Case());
        return "cases/create-case";
    }

    @PostMapping("/create-case")
    public String CreateCase(@ModelAttribute Case cases){
        Calendar cal = Calendar.getInstance();
        Date now = cal.getTime();
        cases.setCreated_at(now);
        caseRepo.save(cases);
        return "redirect:/cases";
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
}