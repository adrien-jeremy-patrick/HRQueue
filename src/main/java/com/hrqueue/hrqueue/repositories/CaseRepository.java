package com.hrqueue.hrqueue.repositories;


import com.hrqueue.hrqueue.models.Case;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface  CaseRepository extends JpaRepository<Case, Long> {


    Case findById(long id);


    List<Case> findByCaseOpenIsNull();
    List<Case> findByCaseClosedIsNotNull();
    List<Case> findByCaseClosedIsNotNullAndWriterId(long id);
    List<Case> findByCaseClosedIsNullAndCaseOpenIsNotNull();



}
