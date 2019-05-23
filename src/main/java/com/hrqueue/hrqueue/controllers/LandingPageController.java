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
//            User admin = new User("","","",,);
            String adminPassword = passwordEncoder.encode("admin");
            String repPassword = passwordEncoder.encode("rep");
            String michaelPassword = passwordEncoder.encode("michael");
            String karenPassword = passwordEncoder.encode("karen");
            String pamPassword = passwordEncoder.encode("pam");
            User admin = new User("admin","admin","admin",adminPassword,true);
            User rep = new User("rep","rep","rep",repPassword,false);
            User michael = new User("Michael","Scott","michael",michaelPassword,false);
            User Karen = new User("Karen","Filippelli","karen",karenPassword,false);
            User Pam = new User("Pam","Halpert","pam",pamPassword,false);
            userRepository.save(admin);
            userRepository.save(rep);
            userRepository.save(michael);
            userRepository.save(Karen);
            userRepository.save(Pam);

        }
        return "index";
    }
}
