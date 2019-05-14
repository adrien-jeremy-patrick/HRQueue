package com.codeup.blog.Repositories;

import com.codeup.blog.models.Post;
import com.hrqueue.hrqueue.models.Case;
import org.springframework.data.repository.CrudRepository;

public interface  UserRepository extends CrudRepository<User, Long> {

}