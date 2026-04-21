package com.systemmanagment.backend.entity;

//This class is going to be saved in a data base
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.lang.model.element.Name;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    //email can not be null  and has to be an unique value
    @Column(name = "email_id",nullable = false, unique = true,  length = 150)
    private String email;

}
