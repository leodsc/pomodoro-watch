package com.pomodorotimer.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;
import java.util.Date;

@Entity
@Data
@Table(name="tasks")
public class TaskModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Temporal(TemporalType.DATE)
    private Date initialDate;

    @NotNull
    @Temporal(TemporalType.DATE)
    private Date finishDate = new Date();

    @NotNull
    private Long seconds;

    private String name;

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private UserModel user;
}
