package io.blackbeat.opendoors.db.entity.Static;

import io.blackbeat.opendoors.db.entity.Resource.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String username;
    private Long spotId;
    private double reviewScore;
    private String reviewContent;
    private String spotName;
    @CreatedDate
    private LocalDateTime createdDate;


    @OneToMany(cascade = CascadeType.ALL)
    private Collection<Image> images = new ArrayList<>();

}
