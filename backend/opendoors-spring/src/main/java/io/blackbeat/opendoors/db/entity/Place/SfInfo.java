package io.blackbeat.opendoors.db.entity.Place;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.AUTO;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SfInfo {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private String sfName;
}
