package com.ssafy.moeutto.domain.clothes.entity;

import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.middleCategory.entity.MiddleCategory;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;

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
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name = "middle_category_id")
    private MiddleCategory middleCategory;

    @NotNull
    @Column(length = 50)
    private String name;

    @NotNull
    @Column(length = 4)
    private String season;

    @NotNull
    @Column(length = 6)
    private String color;

    @NotNull
    private Integer thickness;

    private Integer price;

    @Column(length = 30)
    private String shop;

    @Column(length = 100)
    private String textile;

    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private Integer frequency;

    @Column(columnDefinition = "INTEGER DEFAULT 0")
    private Integer star;

    // 사진 url 추가
    private Date regDate;

    private Date recentDate;

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
