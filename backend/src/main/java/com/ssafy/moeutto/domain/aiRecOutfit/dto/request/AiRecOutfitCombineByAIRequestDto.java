package com.ssafy.moeutto.domain.aiRecOutfit.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
@ToString
public class AiRecOutfitCombineByAIRequestDto {

    @NotNull
    private AiRecOutfitCombineClothesListByAIRequestDto clothesList;

    @NotNull
    private List<AiRecOutfitCombineWeatherByAiRequestDto> weatherInfo;

    @Builder(toBuilder = true)
    public AiRecOutfitCombineByAIRequestDto(AiRecOutfitCombineClothesListByAIRequestDto clothesList, List<AiRecOutfitCombineWeatherByAiRequestDto> weatherInfo) {
        this.clothesList = clothesList;
        this.weatherInfo = weatherInfo;
    }
}
