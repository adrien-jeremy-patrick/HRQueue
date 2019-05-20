package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.Department;
import com.hrqueue.hrqueue.repositories.DepartmentRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
            sizeofArray++;
        }

        System.out.println(sizeofArray);

//        String[] things = new String[sizeofArray];
//        for (Department department : departments){
//            int index = (int) department.getId()-1;
//            if (department.getDepartment() != null) {
//            things[index] = department.getDepartment();}
//        }
//
//        for (String thing : things) {
//            System.out.println(thing);
//        }

        model.addAttribute("department", new Department());
        model.addAttribute("allDepartments", departmentRepo.findAll());





        return "departments/department";
    }

    @PostMapping("/departments")
    public String departments(@RequestParam(name = "department") String departments){
        if (departments != "") {
            Department department = new Department();
            department.setDepartment(departments);
            departmentRepo.save(department);
        }
        return "redirect:/departments";
    }

    @GetMapping("/departments/{department}/delete")
    public String deleteDepartment(@PathVariable String department){
       Department deleteDepartment = departmentRepo.findByDepartment(department);
        departmentRepo.delete(deleteDepartment.getId());
        return "redirect:/departments";
    }


}
