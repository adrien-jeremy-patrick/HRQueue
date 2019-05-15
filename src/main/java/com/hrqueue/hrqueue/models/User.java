package com.hrqueue.hrqueue.models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, columnDefinition = "text")
    private String password;


    @Column (nullable = false)
    private boolean admin;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "writer")
    private List<Case> cases;

    public User(String firstName, String lastName, String username, String password, boolean admin, List<Case> cases) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.admin = admin;
        this.cases = cases;
    }

    public User(String firstName, String lastName, String username, String password, boolean admin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.admin = admin;
    }

    public User(User copy) {
        id = copy.id;
        firstName = copy.firstName;
        lastName = copy.lastName;
        username = copy.username;
        password = copy.password;
        admin = copy.admin;
        cases = copy.cases;
    }

    public User() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public List<Case> getCases() {
        return cases;
    }

    public void setCases(List<Case> cases) {
        this.cases = cases;
    }


}
