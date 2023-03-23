package io.blackbeat.opendoors.db.entity.Place;

import io.blackbeat.opendoors.db.entity.Role;
import io.blackbeat.opendoors.db.entity.Static.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static javax.persistence.GenerationType.AUTO;
import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Data
@ToString(exclude = "Spot")
@NoArgsConstructor
@AllArgsConstructor
public class Spot {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

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

    // 도로명 주소
    private int zipcode;

    //리뷰 평점
    private double reviewRating;

    //리뷰어의 수
    private int reviewCount;

    // 오픈 시간
    private String openHours;

    //메뉴
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="MENU_ID")
    private List<Menu> menus = new ArrayList<>();

    //시설 이용가능 정보
    @OneToMany(mappedBy = "spot", cascade = CascadeType.ALL)
    private List<SpotSfInfo> spotSfInfos = new ArrayList<>();

    // 승인여부
    private String state;

    @OneToMany(cascade = CascadeType.ALL)
    private Collection<Review> reviews = new ArrayList<>();



}
