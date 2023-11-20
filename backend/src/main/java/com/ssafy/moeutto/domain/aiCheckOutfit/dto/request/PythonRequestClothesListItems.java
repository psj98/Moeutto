package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class PythonRequestClothesListItems {

    @NotNull
    private String largeCategoryId;

    @NotNull
    private Integer clothesId;

    @NotNull
    private String clothesName;

    @NotNull
    private String season;

    @NotNull
    private String color;

    @NotNull
    private Integer thickness;

    @NotNull
    private String textile;

    @NotNull
    private Integer frequency;

    @Builder(toBuilder = true)
    public PythonRequestClothesListItems(String largeCategoryId, Integer clothesId, String clothesName, String season, String color, Integer thickness, String textile, Integer frequency) {
        this.largeCategoryId = largeCategoryId;
        this.clothesId = clothesId;
        this.clothesName = clothesName;
        this.season = season;
        this.color = color;
        this.thickness = thickness;
        this.textile = textile;
        this.frequency = frequency;
    }
}
