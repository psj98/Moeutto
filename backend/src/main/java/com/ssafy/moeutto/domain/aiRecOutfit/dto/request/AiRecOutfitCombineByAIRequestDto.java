package com.ssafy.moeutto.domain.aiRecOutfit.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
public class AiRecOutfitCombineByAIRequestDto {

    @NotNull
    private AiRecOutfitCombineClothesListByAIRequestDto clothesList;

    @NotNull
    private List<AiRecOutfitCombineRequestDto> weatherInfo;

    @Builder(toBuilder = true)
    public AiRecOutfitCombineByAIRequestDto(AiRecOutfitCombineClothesListByAIRequestDto clothesList, List<AiRecOutfitCombineRequestDto> weatherInfo) {
        this.clothesList = clothesList;
        this.weatherInfo = weatherInfo;
    }
}
