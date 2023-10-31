package com.ssafy.moeutto.domain.aiRecOutfit.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
public class AIRecOutfitCombineByAIRequestDto {

    @NotNull
    private List<AIRecOutfitCombineClothesRequestDto> clothesList;

    @NotNull
    private List<AIRecOutfitCombineRequestDto> weatherInfo;

    @Builder(toBuilder = true)
    public AIRecOutfitCombineByAIRequestDto(List<AIRecOutfitCombineClothesRequestDto> clothesList, List<AIRecOutfitCombineRequestDto> weatherInfo) {
        this.clothesList = clothesList;
        this.weatherInfo = weatherInfo;
    }
}
