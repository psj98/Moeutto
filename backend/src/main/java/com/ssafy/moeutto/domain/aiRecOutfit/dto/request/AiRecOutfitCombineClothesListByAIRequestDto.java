package com.ssafy.moeutto.domain.aiRecOutfit.dto.request;

import com.ssafy.moeutto.domain.clothes.entity.IClothesAIRecOutfitCombine;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
public class AiRecOutfitCombineClothesListByAIRequestDto {

    @NotNull
    private List<IClothesAIRecOutfitCombine> outer;

    @NotNull
    private List<IClothesAIRecOutfitCombine> top;

    @NotNull
    private List<IClothesAIRecOutfitCombine> bottom;

    @NotNull
    private List<IClothesAIRecOutfitCombine> item;

    @Builder(toBuilder = true)
    public AiRecOutfitCombineClothesListByAIRequestDto(List<IClothesAIRecOutfitCombine> outer, List<IClothesAIRecOutfitCombine> top, List<IClothesAIRecOutfitCombine> bottom, List<IClothesAIRecOutfitCombine> item) {
        this.outer = outer;
        this.top = top;
        this.bottom = bottom;
        this.item = item;
    }
}
