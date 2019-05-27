package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.Case;
import com.hrqueue.hrqueue.models.Category;
import com.hrqueue.hrqueue.models.Department;
import com.hrqueue.hrqueue.models.User;
import com.hrqueue.hrqueue.repositories.CaseRepository;
import com.hrqueue.hrqueue.repositories.CategoryRepository;
import com.hrqueue.hrqueue.repositories.DepartmentRepository;
import com.hrqueue.hrqueue.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;

@Controller
public class CaseController {

    private final CaseRepository caseRepo;
    private final DepartmentRepository departmentRepo;
    private final CategoryRepository categoryRepo;
    private final UserRepository userRepo;

    public CaseController(CaseRepository caseRepo, DepartmentRepository departmentRepo,CategoryRepository categoryRepo, UserRepository userRepo) {
        this.caseRepo = caseRepo;
        this.departmentRepo = departmentRepo;
        this.categoryRepo = categoryRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/cases")

    public String cases() {
        return "cases/cases";
    }

    @GetMapping("/create-case")
    public String CreateCase(Model model) {
        ///Turning find all departments into an Iterable to be able to use
        Iterable<Department> departments = departmentRepo.findAll();
        Iterable<Category> categories = categoryRepo.findAll();
        ///finding the size of the iterable
        int sizeofDepartments = 0;
        int sizeofCategories = 0;
        for (Department department : departments) {
            sizeofDepartments++;
        }
        for(Category category : categories){
            sizeofCategories++;
        }
//        String[] numbers = new String[sizeofDepartments];
//        for (Department department : departments){
//            int index = (int) department.getId()-1;
//            numbers[index] = department.getDepartment();
//        }

//        Arrays.sort(numbers);


        if (sizeofDepartments == 0) {
            Department d1 = new Department("Animal Care Services");
            departmentRepo.save(d1);
            Department d2 = new Department("Arts & Culture");
            departmentRepo.save(d2);
            Department d3 = new Department("Aviation");
            departmentRepo.save(d3);
            Department d4 = new Department("Building & Equipment Services");
            departmentRepo.save(d4);
            Department d5 = new Department("Center City Development & Operations");
            departmentRepo.save(d5);
            Department d6 = new Department("City Attorney");
            departmentRepo.save(d6);
            Department d7 = new Department("City Auditor");
            departmentRepo.save(d7);
            Department d8 = new Department("City Clerk");
            departmentRepo.save(d8);
            Department d9 = new Department("City Councils Office");
            departmentRepo.save(d9);
            Department d10 = new Department("City Managers Office");
            departmentRepo.save(d10);
            Department d11 = new Department("Convention & Sports Facilities");
            departmentRepo.save(d11);
            Department d12 = new Department("Development Services");
            departmentRepo.save(d12);
            Department d13 = new Department("Economic Development");
            departmentRepo.save(d13);
            Department d14 = new Department("Emergency Management");
            departmentRepo.save(d14);
            Department d15 = new Department("Equity");
            departmentRepo.save(d15);
            Department d16 = new Department("Finance");
            departmentRepo.save(d16);
            Department d17 = new Department("Fire");
            departmentRepo.save(d17);
            Department d18 = new Department("Government & Public Affairs");
            departmentRepo.save(d18);
            Department d19 = new Department("Health");
            departmentRepo.save(d19);
            Department d20 = new Department("Historic Preservation");
            departmentRepo.save(d20);
            Department d22 = new Department("Human Resources");
            departmentRepo.save(d22);
            Department d23 = new Department("Human Services");
            departmentRepo.save(d23);
            Department d24 = new Department("Information Technology Services");
            departmentRepo.save(d24);
            Department d25 = new Department("Innovation");
            departmentRepo.save(d25);
            Department d26 = new Department("Library");
            departmentRepo.save(d26);
            Department d27 = new Department("Management & Budget");
            departmentRepo.save(d27);
            Department d28 = new Department("Mayor Office");
            departmentRepo.save(d28);
            Department d29 = new Department("Municipal Court");
            departmentRepo.save(d29);
            Department d30 = new Department("Neighborhood & Housing Servicest");
            departmentRepo.save(d30);
            Department d31 = new Department("Parks & Recreation");
            departmentRepo.save(d31);
            Department d32 = new Department("Planning");
            departmentRepo.save(d32);
            Department d33 = new Department("Police");
            departmentRepo.save(d33);
            Department d34 = new Department("Pre-K 4 SA");
            departmentRepo.save(d34);
            Department d35 = new Department("Risk Management");
            departmentRepo.save(d35);
            Department d36 = new Department("Solid Waste Management");
            departmentRepo.save(d36);
            Department d37 = new Department("Sustainability");
            departmentRepo.save(d37);
            Department d38 = new Department("Transportation & Capital Improvements");
            departmentRepo.save(d38);
            Department d39 = new Department("Tricentennial Commission");
            departmentRepo.save(d39);
            Department d40 = new Department("World Heritage");
            departmentRepo.save(d40);
        }

        if (sizeofCategories == 0) {
            Category c1 = new Category("Beneficiaries");
            categoryRepo.save(c1);
            Category c2 = new Category("Career Guidance");
            categoryRepo.save(c2);
            Category c3 = new Category("Direct Deposit");
            categoryRepo.save(c3);
            Category c4 = new Category("Disciplinary Issue");
            categoryRepo.save(c4);
            Category c5 = new Category("Employee Information Change");
            categoryRepo.save(c5);
            Category c6 = new Category("Employee Offboarding");
            categoryRepo.save(c6);
            Category c7 = new Category("Employee Onboarding");
            categoryRepo.save(c7);
            Category c8 = new Category("Employment Verification");
            categoryRepo.save(c8);
            Category c9 = new Category("General");
            categoryRepo.save(c9);
            Category c10 = new Category("Grievance");
            categoryRepo.save(c10);
            Category c11 = new Category("Leave");
            categoryRepo.save(c11);
            Category c12 = new Category("Medical Dental Vision Pharmacy");
            categoryRepo.save(c12);
            Category c13 = new Category("Other");
            categoryRepo.save(c13);
            Category c14 = new Category("Payroll");
            categoryRepo.save(c14);
            Category c15 = new Category("Retirement");
            categoryRepo.save(c15);
            Category c16 = new Category("Tuition Reimbursement");
            categoryRepo.save(c16);
            Category c17 = new Category("Vacation");
            categoryRepo.save(c17);


        }

        model.addAttribute("case",new Case());
        model.addAttribute("allDepartment", departmentRepo.findAll());
        model.addAttribute("allCategory", categoryRepo.findAll());
        //        See which user is logged in for navbar


        return "cases/create-case";
    }

    @PostMapping("/create-case")
    public String CreateCase(@ModelAttribute Case cases, Model model){
        //Setting TIMESTAMP for case
        Calendar cal = Calendar.getInstance();
        Date now = cal.getTime();
        cases.setCreated_at(now);
//        Department department = departmentRepo.findByDepartment(departments);
//
//        System.out.println(department.getId());
//        System.out.println(department.getDepartment());


//        save case
        caseRepo.save(cases);
        return "redirect:/customer-queue";
    }









    @GetMapping("/customer-queue")
    public String viewCustQueue(Model model) {
        Iterable<Case> cases = caseRepo.findAll();
        boolean display = false;
        for (Case caseIterate : cases){
            if (caseIterate.getCase_open() == null) {
                display = true;
            }
        }
        model.addAttribute("noCases", display);

        model.addAttribute("allCases", caseRepo.findAll());
        return "cases/customer-queue";
    }










    @GetMapping("/case/{id}")

    public String editCase() {
        return "cases/case";
    }

    @GetMapping("/case/{id}/delete-prompt")
    public String deletePrompt(@PathVariable long id, Model model) {
        model.addAttribute("case", caseRepo.findById(id));
        User loggedInUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", userRepo.findById(loggedInUser.getId()));
        return "cases/delete-prompt";
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