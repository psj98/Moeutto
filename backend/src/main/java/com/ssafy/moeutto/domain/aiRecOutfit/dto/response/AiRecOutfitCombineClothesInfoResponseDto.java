package com.ssafy.moeutto.domain.aiRecOutfit.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class AiRecOutfitCombineClothesInfoResponseDto {

    @NotNull
    private Integer clothesId; // 옷 정보 id

    @NotNull
    private String largeCategoryId; // 대분류 카테고리 id

    @NotNull
    private String imageUrl; // 이미지 url

    @Builder(toBuilder = true)
    public AiRecOutfitCombineClothesInfoResponseDto(Integer clothesId, String largeCategoryId, String imageUrl) {
        this.clothesId = clothesId;
        this.largeCategoryId = largeCategoryId;
        this.imageUrl = imageUrl;
    }
}
