package com.ssafy.moeutto.domain.aiRecOutfit.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class AiRecOutfitCombineByAIResponseDto {

    private List<Integer> clothesId;

    private String recDate;

    @Builder(toBuilder = true)
    public AiRecOutfitCombineByAIResponseDto(List<Integer> clothesId, String recDate) {
        this.clothesId = clothesId;
        this.recDate = recDate;
    }
}
