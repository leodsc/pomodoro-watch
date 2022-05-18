package com.pomodorotimer.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
@Table(name="users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String randomUUID;

    @Email
    private String email;

    private String password;

    @OneToMany(mappedBy="user", cascade= {CascadeType.ALL})
    @JsonIgnoreProperties("user")
    private List<TaskModel> tasks;
}
