package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.UUID;


@Getter
@NoArgsConstructor
public class ClothesRegistResponseDto {


    @Id
    @NotNull
    private Integer id;
    @NotNull
    private Member member;
    @NotNull
    private String middleCategoryId;
    @NotNull
    private String largeCategoryId;
    @NotNull
    private String name;
    @NotNull
    private String season;
    @NotNull
    private String color;
    @NotNull
    private Integer thickness;

    private Integer price;
    @NotNull
    private String shop;
    @NotNull
    private String textile;

    private Integer frequency;

    private Integer star;

    private String imageUrl;

    private Timestamp regDate;
    @NotNull
    private Timestamp recentDate;



    @Builder(toBuilder = true)
    public ClothesRegistResponseDto(Integer id, Member member, String middleCategoryId, String largeCategoryId, String name, String season, String color, Integer thickness, Integer price, String shop, String textile, Integer frequency, Integer star, String imageUrl, Timestamp regDate, Timestamp recentDate) {
        this.id = id;
        this.member = member;
        this.middleCategoryId = middleCategoryId;
        this.largeCategoryId = largeCategoryId;
        this.name = name;
        this.season = season;
        this.color = color;
        this.thickness = thickness;
        this.price = price;
        this.shop = shop;
        this.textile = textile;
        this.frequency = frequency;
        this.star = star;
        this.imageUrl = imageUrl;
        this.regDate = regDate;
        this.recentDate = recentDate;
    }




}
