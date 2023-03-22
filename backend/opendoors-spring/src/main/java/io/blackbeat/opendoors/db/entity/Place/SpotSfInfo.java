package io.blackbeat.opendoors.db.entity.Place;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Data
@ToString(exclude = "SpotSfInfo")
@NoArgsConstructor
@AllArgsConstructor
public class SpotSfInfo {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "spot_id")
    @JsonIgnore
    private Spot spot;

    @ManyToOne
    @JoinColumn(name = "sfinfo_id")
    private SfInfo sfInfo;
}