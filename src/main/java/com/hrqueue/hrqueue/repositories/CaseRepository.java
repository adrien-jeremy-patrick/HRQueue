package com.hrqueue.hrqueue.repositories;


import com.hrqueue.hrqueue.models.Case;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface  CaseRepository extends CrudRepository<Case, Long> {

    Case findById(long id);

    List<Case> findByCaseOpenIsNull();
    List<Case> findByCaseClosedIsNotNull();

}
