package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.Department;
import com.hrqueue.hrqueue.repositories.DepartmentRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class DepartmentController {

    private final DepartmentRepository departmentRepo;

    public DepartmentController(DepartmentRepository departmentRepo){
        this.departmentRepo = departmentRepo;
    }

    @GetMapping("/departments")
    public String departments(Model model) {
        model.addAttribute("department", new Department());
        model.addAttribute("alDepartments",departmentRepo.findAll());
        return "departments/department";
    }

    @PostMapping("/departments")
    public String departments(@ModelAttribute Department departments,@ModelAttribute Department departmentDelete){

        System.out.println(departmentDelete.getId());
        departmentRepo.save(departments);
        return "redirect:/departments";
    }

    @PostMapping("/departments/delete")
    public String departments (@ModelAttribute Department departments){
        System.out.println(departments.getDepartment());
        return "redirect:/departments";
    }
}
