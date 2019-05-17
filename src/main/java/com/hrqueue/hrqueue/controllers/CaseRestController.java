package com.hrqueue.hrqueue.controllers;

import java.util.List;

import com.hrqueue.hrqueue.models.Case;
import com.hrqueue.hrqueue.services.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class CaseRestController {

    @Autowired
    private CaseService caseService;

    @GetMapping("/reports")
    public List<Case> getAllCases(){
        return caseService.getAllCases();
    }
    @GetMapping("/reports/{id}")
    public Case getCaseById(@PathVariable("id") long id){
        return caseService.getCaseById(id);
    }
}
