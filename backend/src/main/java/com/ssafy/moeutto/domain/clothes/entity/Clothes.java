package com.ssafy.moeutto.domain.clothes.entity;

import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.middleCategory.entity.MiddleCategory;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class Clothes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // 옷 id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // 사용자 정보
    
    @OneToOne
    @JoinColumn(name = "middle_category_id")
    private MiddleCategory middleCategory; // 중분류 카테고리 정보

    @NotNull
    @Column(length = 50)
    private String name; // 옷 이름

    @NotNull
    @Column(length = 4)
    private String season; // 계절

    @NotNull
    @Column(length = 6)
    private String color; // 색상

    @NotNull
    private Integer thickness; // 두께

    private Integer price; // 가격

    @Column(length = 30)
    private String shop; // 구매처

    @Column(length = 100)
    private String textile; // 소재

    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private Integer frequency; // 빈도

    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private Integer star; // 즐겨찾기 여부

    // 사진 url 추가
    private Date regDate; // 등록 날짜

    private Date recentDate; // 최근 입은 날짜

    @Builder(toBuilder = true)
    public Clothes(Integer id, Member member, MiddleCategory middleCategory, String name, String season, String color, Integer thickness, Integer price, String shop, String textile, Integer frequency, Integer star, Date regDate, Date recentDate) {
        this.id = id;
        this.member = member;
        this.middleCategory = middleCategory;
        this.name = name;
        this.season = season;
        this.color = color;
        this.thickness = thickness;
        this.price = price;
        this.shop = shop;
        this.textile = textile;
        this.frequency = frequency;
        this.star = star;
        this.regDate = regDate;
        this.recentDate = recentDate;
    }
}
