package com.hrqueue.hrqueue.repositories;


import com.hrqueue.hrqueue.models.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface  CaseRepository extends JpaRepository<Case, Long> {

    Case findById(long id);


}
