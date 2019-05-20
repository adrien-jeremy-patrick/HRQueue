package com.hrqueue.hrqueue.repositories;


import com.hrqueue.hrqueue.models.Department;
import org.springframework.data.repository.CrudRepository;

public interface  DepartmentRepository extends CrudRepository<Department, Long> {

    Iterable<Department> findAll();

    Department findByDepartment(String id);


}