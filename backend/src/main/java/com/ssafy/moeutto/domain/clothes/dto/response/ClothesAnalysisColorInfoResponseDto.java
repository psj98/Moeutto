package com.ssafy.moeutto.domain.clothes.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ClothesAnalysisColorInfoResponseDto {

    @NotNull
    private String color;

    @NotNull
    private Integer amount;

    @Builder(toBuilder = true)
    public ClothesAnalysisColorInfoResponseDto(String color, Integer amount) {
        this.color = color;
        this.amount = amount;
    }
}
