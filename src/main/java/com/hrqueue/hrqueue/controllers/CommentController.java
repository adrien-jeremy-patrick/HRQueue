package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.Case;
import com.hrqueue.hrqueue.models.Comment;
import com.hrqueue.hrqueue.models.User;
import com.hrqueue.hrqueue.repositories.CaseRepository;
import com.hrqueue.hrqueue.repositories.CommentRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;

@Controller
public class CommentController {

    private final CommentRepository commentRepo;
    private final CaseRepository caseRepo;

    public CommentController(CommentRepository commentRepo,CaseRepository caseRepo) {
        this.caseRepo = caseRepo;
        this.commentRepo = commentRepo;
    }

    @GetMapping("/case/{id}/comment")
    public String comments(Model model, @PathVariable long id) {
        Case commentCase = caseRepo.findById(id);
        Calendar cal = Calendar.getInstance();
        Date now = cal.getTime();
        System.out.println(now);
//        System.out.println(cal.add(Calendar.DAY_OF_MONTH, -5));
        model.addAttribute("commentObject", new Comment());
        model.addAttribute("case",commentCase);
        model.addAttribute("caseComments", commentRepo.findAllByCasesId(id));
        return "comments";
    }

    @PostMapping("/comment/{id}/create")
    public String comments(@RequestParam(name = "comment") String comments, @PathVariable long id){
        Calendar cal = Calendar.getInstance();
        Comment comment = new Comment();
        Date now = cal.getTime();
        comment.setComment(comments);
        comment.setCommentStamp(now);
        Case commentCase = caseRepo.findById(id);
        comment.setCases(commentCase);
        User loggedInUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        comment.setWriter(loggedInUser);
        commentRepo.save(comment);
        return "redirect:/case/"+id+"/comment";
    }

}
