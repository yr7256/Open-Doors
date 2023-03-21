package io.blackbeat.opendoors.db.entity.Place;

import io.blackbeat.opendoors.db.entity.Role;
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
public class Spot {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long Id;

    private String spotAddress;  //주소

    private String spotBuildingName; //소속빌딩 이름

    private String spotName; // 상호명

    @Column(columnDefinition = "INT UNSIGNED")
    private int spotAveragePoint; //별점포인트

    //위경도
    private double spotLat;
    private double spotLng;

    //카테고리
    private String spotCategory;

    //배팟 준팟 공팟
    private String spotRate;

    //전화번호호
    private String spotTelNumber;

    //시설 이용가능 정보

    @OneToMany(mappedBy = "spot", cascade = CascadeType.ALL)
    private List<SpotSfInfo> spotSfInfos = new ArrayList<>();

    // 도로명 주소





}
