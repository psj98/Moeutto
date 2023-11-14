package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisFrequency;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 옷 빈도 분석 Response Dto
 */
@Data
@NoArgsConstructor
public class ClothesAnalysisFrequencyResponseDto {

    @NotNull
    private List<IClothesAnalysisFrequency> myMostFrequency; // 가장 많이 입은 옷 3가지

    @NotNull
    private List<IClothesAnalysisFrequency> myLeastFrequency; // 가장 적게 입은 옷 3가지

    @Builder(toBuilder = true)
    public ClothesAnalysisFrequencyResponseDto(List<IClothesAnalysisFrequency> myMostFrequency, List<IClothesAnalysisFrequency> myLeastFrequency) {
        this.myMostFrequency = myMostFrequency;
        this.myLeastFrequency = myLeastFrequency;
    }
}
