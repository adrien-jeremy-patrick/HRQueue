package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.User;
import com.hrqueue.hrqueue.repositories.CaseRepository;
import com.hrqueue.hrqueue.repositories.CategoryRepository;
import com.hrqueue.hrqueue.repositories.DepartmentRepository;
import com.hrqueue.hrqueue.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class GeneratorController {

    private final CaseRepository caseRepo;
    private final DepartmentRepository departmentRepo;
    private final CategoryRepository categoryRepo;
    private final UserRepository userRepo;
    private PasswordEncoder passwordEncoder;

    public String FirstNameGenerator() {
        String[] first = {"Liam","Emma","Noah","Olivia","William","Ava","James","Isabella","Oliver","Sophia","Benjamin","Charlotte","Elijah","Mia","Lucas","Amelia","Mason","Harper","Logan","Evelyn","Alexander","Abigail","Ethan","Emily","Jacob","Elizabeth","Michael","Mila","Daniel","Henry","Avery","Jackson","Sofia","Sebastian","Camila","Aiden","Aria","Matthew","Scarlett","Samuel","Victoria","David","Madison","Joseph","Luna","Carter","Grace","Owen","Chloe","Wyatt","Penelope","John","Layla","Jack","Riley","Luke","Zoey","Jayden","Nora","Dylan","Lily","Grayson","Eleanor","Levi","Hannah","Isaac","Lillian","Gabriel","Addison","Julian"};
        int index = (int) (Math.random() * first.length);
        return first[index];
    }

    public String LastNameGenerator() {
        String[] first = {"Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White","Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall"};
        int index = (int) (Math.random() * first.length);
        return first[index];
    }

    public boolean adminGenerator() {
        int index = (int) (Math.random() * 2);
        if (index == 0){
            return true;
        } else
            return false;
    }

    public GeneratorController(CaseRepository caseRepo, DepartmentRepository departmentRepo, CategoryRepository categoryRepo, UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.caseRepo = caseRepo;
        this.departmentRepo = departmentRepo;
        this.categoryRepo = categoryRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/generation")
    public String generate(){
        return "/generation";
    }

    @PostMapping("/generation/userGenerate")
    public String generateUsers(@RequestParam(name = "number")int number){
        System.out.println(number);
            for (int i = 0;i<number;i++){
                User user = new User();
                user.setFirstName(FirstNameGenerator());
                user.setLastName(LastNameGenerator());
                user.setUsername(user.getFirstName());
                user.setAdmin(adminGenerator());
                userRepo.save(user);
                String password = passwordEncoder.encode(user.getFirstName()+user.getId());
                user.setPassword(password);
                userRepo.save(user);
            }
        return "redirect:/generation";
    }





}
