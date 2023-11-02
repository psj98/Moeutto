package com.ssafy.moeutto.domain.clothes.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ClothesUpdateRequestDto {

    @NotNull
    private Integer id; // 옷 id

    @NotNull
    private String middleCategoryId; // 중분류 카테고리 id

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
    private String imageUrl; // 이미지 url

    @Builder(toBuilder = true)
    public ClothesUpdateRequestDto(Integer id, String middleCategoryId, String name, String season, String color, Integer thickness, Integer price, String shop, String textile, String imageUrl) {
        this.id = id;
        this.middleCategoryId = middleCategoryId;
        this.name = name;
        this.season = season;
        this.color = color;
        this.thickness = thickness;
        this.price = price;
        this.shop = shop;
        this.textile = textile;
        this.imageUrl = imageUrl;
    }
}
