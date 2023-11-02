package com.ssafy.moeutto.domain.aiRecOutfit.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class AiRecOutfitCombineListByAIResponseDto {

    private List<AiRecOutfitCombineByAIResponseDto> aiRecOutfitCombineByAIResponseDtoList;

    @Builder(toBuilder = true)
    public AiRecOutfitCombineListByAIResponseDto(List<AiRecOutfitCombineByAIResponseDto> aiRecOutfitCombineByAIResponseDtoList) {
        this.aiRecOutfitCombineByAIResponseDtoList = aiRecOutfitCombineByAIResponseDtoList;
    }
}
