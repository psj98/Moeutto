package com.ssafy.moeutto.domain.aiRecOutfit.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class AiRecOutfitCombineClothesRequestDto {

    @NotNull
    private Integer clothesId;

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
    public AiRecOutfitCombineClothesRequestDto(Integer clothesId, String season, String color, Integer thickness, String textile, Integer frequency) {
        this.clothesId = clothesId;
        this.season = season;
        this.color = color;
        this.thickness = thickness;
        this.textile = textile;
        this.frequency = frequency;
    }
}
