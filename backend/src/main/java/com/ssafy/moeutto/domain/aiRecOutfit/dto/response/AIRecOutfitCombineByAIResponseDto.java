package com.ssafy.moeutto.domain.aiRecOutfit.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Getter
@NoArgsConstructor
public class AIRecOutfitCombineByAIResponseDto {

    private List<Integer> clothesId;

    private Date recDate;

    @Builder(toBuilder = true)
    public AIRecOutfitCombineByAIResponseDto(List<Integer> clothesId, Date recDate) {
        this.clothesId = clothesId;
        this.recDate = recDate;
    }
}
