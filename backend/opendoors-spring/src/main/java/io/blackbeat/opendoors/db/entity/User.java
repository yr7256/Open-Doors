package io.blackbeat.opendoors.db.entity;


import com.sun.istack.NotNull;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Static.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static javax.persistence.GenerationType.AUTO;
import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String name;
    private String username;
    private String password;
    private String gender;
    private String birthDay;
    private String birthMonth;
    private String birthYear;
    private int point;
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    private Collection<SfInfo> sfInfoIds = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    private Collection<Review> reviews = new ArrayList<>();

}
