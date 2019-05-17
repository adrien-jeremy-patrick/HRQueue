package com.hrqueue.hrqueue.services;

import com.hrqueue.hrqueue.models.Case;

import java.util.List;

public interface CaseService {

    public List<Case> getAllCases();
    public Case getCaseById(long id);

}
