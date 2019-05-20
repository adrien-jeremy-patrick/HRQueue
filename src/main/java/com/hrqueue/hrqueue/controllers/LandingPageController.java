package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.User;
import com.hrqueue.hrqueue.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LandingPageController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public LandingPageController(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/")
    public String Home() {
        Iterable<User> users = userRepository.findAll();
        int sizeofArray = 0;
        for (User user : users) {
            sizeofArray = (int) user.getId();
        }

        if (sizeofArray == 0) {
            String password = passwordEncoder.encode("admin");
            System.out.println(password);
            User admin = new User("admin","admin","admin",password,true);
            userRepository.save(admin);
        }
        return "index";
    }
}
