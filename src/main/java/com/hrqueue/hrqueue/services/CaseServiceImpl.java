package com.hrqueue.hrqueue.services;

import com.hrqueue.hrqueue.models.Case;
import com.hrqueue.hrqueue.repositories.CaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("caseService")
public class CaseServiceImpl implements CaseService {

    @Autowired
    private CaseRepository caseRepository;

    @Override
    public List<Case> getAllCases() {
        return caseRepository.findAll();
    }

    @Override
    public Case getCaseById(long id) {
        return caseRepository.findOne(id);
    }

}