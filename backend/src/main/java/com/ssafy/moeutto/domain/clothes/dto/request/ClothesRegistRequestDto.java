package com.ssafy.moeutto.domain.clothes.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 옷 등록 정보 Request Dto
 */
@Getter
@NoArgsConstructor
public class ClothesRegistRequestDto {

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

    private Integer price; // 가격

    private String shop; // 구매처

    private String textile; // 소재
}
