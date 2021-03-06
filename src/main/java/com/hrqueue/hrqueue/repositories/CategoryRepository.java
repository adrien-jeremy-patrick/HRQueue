package com.hrqueue.hrqueue.repositories;



import com.hrqueue.hrqueue.models.Category;
import org.springframework.data.repository.CrudRepository;

public interface  CategoryRepository extends CrudRepository<Category, Long> {

    Iterable<Category> findAll();

    Category findByCategory(String id);

}