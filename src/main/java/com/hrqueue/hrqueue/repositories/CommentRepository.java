package com.hrqueue.hrqueue.repositories;

import com.hrqueue.hrqueue.models.Comment;
import org.springframework.data.repository.CrudRepository;

public interface  CommentRepository extends CrudRepository<Comment, Long> {

}