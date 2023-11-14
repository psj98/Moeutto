package com.ssafy.moeutto.domain.aiRecOutfit.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class AiRecOutfitCombineListByAIResponseDto {

    private List<AiRecOutfitCombineByAIResponseDto> aiRecommend;

    @Builder(toBuilder = true)
    public AiRecOutfitCombineListByAIResponseDto(List<AiRecOutfitCombineByAIResponseDto> aiRecommend) {
        this.aiRecommend = aiRecommend;
    }
}
