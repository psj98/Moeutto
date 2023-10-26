package com.ssafy.moeutto.domain.clothes.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ClothesRegistRequestDto {

    @NotNull
    private String middleCategoryId;
    @NotNull
    private String name;
    @NotNull
    private String season;
    @NotNull
    private String thickness;

    private Integer price;

    private String shop;

    private String textile;

    private String image;
}
