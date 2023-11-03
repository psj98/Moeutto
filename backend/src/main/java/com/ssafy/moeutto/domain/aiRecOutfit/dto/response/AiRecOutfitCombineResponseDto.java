package com.ssafy.moeutto.domain.aiRecOutfit.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.List;

@Getter
@NoArgsConstructor
public class AiRecOutfitCombineResponseDto {

    @NotNull
    private List<AiRecOutfitCombineClothesInfoResponseDto> clothesInfo;

    @NotNull
    private Date recDate; // 추천 날짜

    @Builder(toBuilder = true)
    public AiRecOutfitCombineResponseDto(List<AiRecOutfitCombineClothesInfoResponseDto> clothesInfo, Date recDate) {
        this.clothesInfo = clothesInfo;
        this.recDate = recDate;
    }
}
