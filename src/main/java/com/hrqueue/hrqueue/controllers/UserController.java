package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.User;
import com.hrqueue.hrqueue.repositories.CaseRepository;
import com.hrqueue.hrqueue.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class UserController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private CaseRepository caseRepository;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder, CaseRepository caseRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.caseRepository = caseRepository;
    }



    @GetMapping("/create-user")
    public String createUser(Model model) {
        model.addAttribute("user", new User());
        return "users/user-create";
    }

    @PostMapping("/create-user")

    public String createUser(@ModelAttribute User user) {
        String hash = passwordEncoder.encode(user.getPassword());
        user.setPassword(hash);



        userRepository.save(user);
        return "redirect:/login";

    }


    @GetMapping("/rep-admin-dashboard")
    public String showRepDash(Model model) {
        User loggedInUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("allCases", caseRepository.findByCaseOpenIsNull());
        model.addAttribute("user", userRepository.findById(loggedInUser.getId()));
        model.addAttribute("closedCases",caseRepository.findByCaseClosedIsNotNull());
        return "users/rep-admin-dashboard";
    }

    @GetMapping("/user/{id}/edit")
    public String showUserEdit(Model model) {
        User loggedInUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("user", userRepository.findById(loggedInUser.getId()));
        return "users/user-edit";
    }







}
