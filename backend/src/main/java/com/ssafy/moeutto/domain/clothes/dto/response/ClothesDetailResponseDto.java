package com.ssafy.moeutto.domain.clothes.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@NoArgsConstructor
public class ClothesDetailResponseDto {

    @NotNull
    private Integer id; // 옷 id

    @NotNull
    private String middleCategoryId; // 중분류 카테고리 id

    @NotNull
    private String largeCategoryId; // 대분류 카테고리 id

    @NotNull
    private String name; // 옷 이름

    @NotNull
    private String season; // 계절

    @NotNull
    private String color; // 색상

    @NotNull
    private Integer thickness; // 두께

    @NotNull
    private Integer price; // 가격

    @NotNull
    private String shop; // 구매처

    @NotNull
    private String textile; // 소제

    @NotNull
    private Integer frequency; // 빈도

    @NotNull
    private Integer star; // 즐겨찾기 여부

    @NotNull
    private String imageUrl; // 이미지 url

    @NotNull
    private Date recentDate; // 최근 입은 날짜

    @Builder(toBuilder = true)
    public ClothesDetailResponseDto(Integer id, String middleCategoryId, String largeCategoryId, String name, String season, String color, Integer thickness, Integer price, String shop, String textile, Integer frequency, Integer star, String imageUrl, Date recentDate) {
        this.id = id;
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
        this.recentDate = recentDate;
    }
}
