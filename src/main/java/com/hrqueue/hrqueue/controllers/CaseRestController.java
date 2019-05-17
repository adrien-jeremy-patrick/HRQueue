package com.hrqueue.hrqueue.controllers;

import com.hrqueue.hrqueue.models.Case;
import com.hrqueue.hrqueue.services.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class CaseRestController {

    @Autowired
    private CaseService caseService;

    @GetMapping("/reports-cases")
    public List<Case> getAllCases(){
        return caseService.getAllCases();
    }
    @GetMapping("/reports/{id}")
    public Case getCaseById(@PathVariable("id") long id){
        return caseService.getCaseById(id);
    }
}
