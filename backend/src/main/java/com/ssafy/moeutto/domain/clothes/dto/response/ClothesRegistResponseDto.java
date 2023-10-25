package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.middleCategory.entity.MiddleCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@NoArgsConstructor
public class ClothesRegistResponseDto {

    @NotNull
    private Integer id;

    @NotNull
    private Member member;

    @NotNull
    private MiddleCategory middleCategory;

    @NotNull
    private String name;

    @NotNull
    private String season;

    @NotNull
    private String color;

    @NotNull
    private Integer thickness;

    private Integer price;

    @Column(length = 30)
    private String shop;

    private String textile;

    private Integer frequency;

    private Integer star;

    // 사진 url 추가

    private Date regDate;

    private Date recentDate;

    @Builder(toBuilder = true)

    public ClothesRegistResponseDto(Integer id, Member member, MiddleCategory middleCategory, String name, String season, String color, Integer thickness, Integer price, String shop, String textile, Integer frequency, Integer star, Date regDate, Date recentDate) {
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
