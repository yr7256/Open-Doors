package io.blackbeat.opendoors.db.entity;

import io.blackbeat.opendoors.db.entity.common.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "point")
public class Point extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true, nullable = false)
    private String username;
    private Integer totalPoint;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "point_id")
    private List<PointRecord> pointRecords = new ArrayList<>();

    public void increasePoint(int point) {
        this.totalPoint += point;
    }

    public void decreasePoint(int point) {
        this.totalPoint -= point;
    }
}
