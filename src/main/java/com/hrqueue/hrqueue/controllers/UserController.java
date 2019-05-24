package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.User;
import com.hrqueue.hrqueue.repositories.CaseRepository;
import com.hrqueue.hrqueue.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


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

        if (loggedInUser.isAdmin()) {
            System.out.println(true);
            model.addAttribute("closedCases", caseRepository.findAll());
        } else {
            System.out.println(false);
            model.addAttribute("closedCases", caseRepository.findByCaseClosedIsNotNullAndWriterId(loggedInUser.getId()));
        }

            return "users/rep-admin-dashboard";
        }

        @GetMapping("/user/display")
        public String showeEditpage(Model model){
            User loggedInUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            model.addAttribute("user", userRepository.findById(loggedInUser.getId()));
            model.addAttribute("allUsers",userRepository.findAll());
        return "users/user-display";
        }

        @GetMapping("/user/{id}/display")
        public String showUserEdit(Model model, @PathVariable long id){
            User loggedInUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            model.addAttribute("user", userRepository.findById(loggedInUser.getId()));
            model.addAttribute("userProfile", userRepository.findById(id));
            return "users/user-edit";
        }

    @PostMapping("/user/{id}/edit")
    public String showUserEdit(@PathVariable long id, @RequestParam(name = "firstName")String firstName,@RequestParam(name = "lastName")String lastName,@RequestParam(name = "username")String username,@RequestParam(name = "password")String password){
        User editUser = userRepository.findById(id);
        System.out.println(id);
        editUser.setFirstName(firstName);
        editUser.setLastName(lastName);
        editUser.setUsername(username);
        String newPassword = passwordEncoder.encode(password);
        editUser.setPassword(newPassword);
        userRepository.save(editUser);
        return "redirect:/user/display";
    }



}
