package com.hrqueue.hrqueue.models;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comments")
public class Comment {

    @Id @GeneratedValue
    private long id;

    @Column
    private String comment;

    @Column
    private Date commentStamp;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User writer;

    public Comment(String comment, Date commentStamp) {
        this.comment = comment;
        this.commentStamp = commentStamp;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getCommentStamp() {
        return commentStamp;
    }

    public void setCommentStamp(Date commentStamp) {
        this.commentStamp = commentStamp;
    }
}
