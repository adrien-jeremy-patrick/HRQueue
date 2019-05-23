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

    @OneToOne
    private Case cases;

    public Comment(){
    }

    public Comment(String comment, Date commentStamp, User writer, Case cases) {
        this.comment = comment;
        this.commentStamp = commentStamp;
        this.writer = writer;
        this.cases = cases;
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

    public User getWriter() {
        return writer;
    }

    public void setWriter(User writer) {
        this.writer = writer;
    }

    public Case getCases() {
        return cases;
    }

    public void setCases(Case cases) {
        this.cases = cases;
    }
}
