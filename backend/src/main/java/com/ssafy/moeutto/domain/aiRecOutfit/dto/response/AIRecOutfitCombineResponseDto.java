package com.ssafy.moeutto.domain.aiRecOutfit.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@NoArgsConstructor
public class AIRecOutfitCombineResponseDto {

    @NotNull
    private Integer clothesId; // 옷 정보 id

    @NotNull
    private String largeCategoryId; // 대분류 카테고리 id

    @NotNull
    private String imageUrl; // 이미지 url

    @NotNull
    private Date recDate; // 추천 날짜

    @Builder(toBuilder = true)
    public AIRecOutfitCombineResponseDto(Integer clothesId, String largeCategoryId, String imageUrl, Date recDate) {
        this.clothesId = clothesId;
        this.largeCategoryId = largeCategoryId;
        this.imageUrl = imageUrl;
        this.recDate = recDate;
    }
}
