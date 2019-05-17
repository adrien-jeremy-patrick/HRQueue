package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.Case;
import com.hrqueue.hrqueue.models.User;
import com.hrqueue.hrqueue.repositories.CaseRepository;
import com.hrqueue.hrqueue.repositories.CategoryRepository;
import com.hrqueue.hrqueue.repositories.DepartmentRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Calendar;
import java.util.Date;

@Controller
public class CaseController {

    private final CaseRepository caseRepo;
    private final DepartmentRepository departmentRepo;
    private final CategoryRepository categoryRepo;

    public CaseController(CaseRepository caseRepo, DepartmentRepository departmentRepo,CategoryRepository categoryRepo) {
        this.caseRepo = caseRepo;
        this.departmentRepo = departmentRepo;
        this.categoryRepo = categoryRepo;
    }

    @GetMapping("/cases")

    public String cases() {
        return "cases/cases";
    }

    @GetMapping("/create-case")
    public String CreateCase(Model model) {
        model.addAttribute("case",new Case());
        model.addAttribute("allDepartment", departmentRepo.findAll());
        model.addAttribute("allCategory", categoryRepo.findAll());
        return "cases/create-case";
    }

    @PostMapping("/create-case")
    public String CreateCase(@ModelAttribute Case cases){
        //Setting TIMESTAMP for case
        Calendar cal = Calendar.getInstance();
        Date now = cal.getTime();

        System.out.println(cases.getDepartment().getDepartment());
        System.out.println(cases.getCategory().getCategory());


        cases.setCreated_at(now);
        caseRepo.save(cases);
        return "redirect:/customer-queue";
    }









    @GetMapping("/customer-queue")


    public String viewCustQueue(Model model) {
        model.addAttribute("allCases", caseRepo.findAll());
        return "cases/customer-queue";
    }










    @GetMapping("/case/{id}")

    public String editCase() {
        return "cases/case";
    }

    @GetMapping("/case/{id}/delete")
    public String deleteCase(@PathVariable long id) {
        caseRepo.delete(id);
        return "redirect:/rep-admin-dashboard";
    }

    @GetMapping("/case/{id}/assign")
    public String assignCase(@PathVariable long id) {
       Case assign = caseRepo.findById(id);
       Calendar cal = Calendar.getInstance();
       Date now = cal.getTime();
       assign.setCase_open(now);
       User loggedInUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
       assign.setWriter(loggedInUser);
       caseRepo.save(assign);
        return "redirect:/rep-admin-dashboard";
    }


    @GetMapping("/case/{id}/unassign")
    public String unAssignCase(@PathVariable long id){
        Case unassign = caseRepo.findById(id);
        unassign.setWriter(null);
        unassign.setCase_open(null);
        caseRepo.save(unassign);
        return "redirect:/rep-admin-dashboard";
    }

    @GetMapping("/case/{id}/complete")
    public String complete(@PathVariable long id){
        Case complete = caseRepo.findById(id);
        Calendar cal = Calendar.getInstance();
        Date now = cal.getTime();
        complete.setCase_closed(now);
        caseRepo.save(complete);
        return "redirect:/rep-admin-dashboard";
    }

    @GetMapping("/case/{id}/open")
    public String open(@PathVariable long id){
        Case open = caseRepo.findById(id);
        open.setCase_closed(null);
        open.setCase_open(null);
        open.setWriter(null);
        caseRepo.save(open);
        return "redirect:/rep-admin-dashboard";
    }


    @GetMapping("/reports")
    public String reports(){
        return "cases/reports";
    }



}