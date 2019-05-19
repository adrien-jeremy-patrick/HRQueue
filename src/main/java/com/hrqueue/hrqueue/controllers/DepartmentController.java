package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.Department;
import com.hrqueue.hrqueue.repositories.DepartmentRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;

@Controller
public class DepartmentController {

    private final DepartmentRepository departmentRepo;

    public DepartmentController(DepartmentRepository departmentRepo){


        this.departmentRepo = departmentRepo;
    }

    @GetMapping("/departments")
    public String departments(Model model) {
        ///Turning find all departments into an Iterable to be able to use
        Iterable<Department> departments = departmentRepo.findAll();
        ///finding the size of the iterable
        int sizeofArray = 0;
        for (Department department : departments) {
            sizeofArray = (int)department.getId();
        }

        String[] numbers = new String[sizeofArray];
        for (Department department : departments){
            int index = (int) department.getId()-1;
            numbers[index] = department.getDepartment();
        }
        Arrays.sort(numbers);

        model.addAttribute("department", new Department());
        model.addAttribute("allDepartments", numbers);





        return "departments/department";
    }

    @PostMapping("/departments")
    public String departments(@RequestParam(name = "department") String departments){
        Department department = new Department();
        department.setDepartment(departments);
        departmentRepo.save(department);
        return "redirect:/departments";
    }

//    @PostMapping("/departments/delete")
//    public String departments (@ModelAttribute Department departments){
////        System.out.println(departments.getDepartment());
//        return "redirect:/departments";
//    }


}
