package com.hrqueue.hrqueue.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "cases")
public class Case {


    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User writer;

    @OneToOne
    private Category category;

    @OneToOne
    private Department department;

    @Column(nullable = false)
    private Date created_at;

    @Column
    private Date caseOpen;

    @Column
    private Date caseClosed;

    @Column(nullable = false)
    private String customer_name;

    @Column(nullable = false)
    @NotNull(message = "error.title.notnull")
    private String customer_email;

    @Column(nullable = false)
    private String customer_phone;

    @Column(columnDefinition = "text")
    private String customer_comment;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "writer")
    private List<Comment> comments;

    public Case(User writer, Category category, Department department, Date created_at, Date case_open, Date case_closed, String customer_name, String customer_email, String customer_phone, String customer_comment) {
        this.writer = writer;
        this.category = category;
        this.department = department;
        this.created_at = created_at;
        this.caseOpen = case_open;
        this.caseClosed = case_closed;
        this.customer_name = customer_name;
        this.customer_email = customer_email;
        this.customer_phone = customer_phone;
        this.customer_comment = customer_comment;
    }


    public Case() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getWriter() {
        return writer;
    }

    public void setWriter(User writer) {
        this.writer = writer;
    }

//    public void setWriter(){
//        this.writer = null;
//    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getCase_open() {
        return caseOpen;
    }

    public void setCase_open(Date case_open) {
        this.caseOpen = case_open;
    }

    public Date getCase_closed() {
        return caseClosed;
    }

    public void setCase_closed(Date case_closed) {
        this.caseClosed = case_closed;
    }

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }

    public String getCustomer_email() {
        return customer_email;
    }

    public void setCustomer_email(String customer_email) {
        this.customer_email = customer_email;
    }

    public String getCustomer_phone() {
        return customer_phone;
    }

    public void setCustomer_phone(String customer_phone) {
        this.customer_phone = customer_phone;
    }

    public String getCustomer_comment() {
        return customer_comment;
    }

    public void setCustomer_comment(String customer_comment) {
        this.customer_comment = customer_comment;
    }
}