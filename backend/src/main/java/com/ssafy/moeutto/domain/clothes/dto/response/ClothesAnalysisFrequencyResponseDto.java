package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisFrequency;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ClothesAnalysisFrequencyResponseDto {

    private List<IClothesAnalysisFrequency> myMostFrequency;

    private List<IClothesAnalysisFrequency> myLeastFrequency;

    @Builder(toBuilder = true)
    public ClothesAnalysisFrequencyResponseDto(List<IClothesAnalysisFrequency> myMostFrequency, List<IClothesAnalysisFrequency> myLeastFrequency) {
        this.myMostFrequency = myMostFrequency;
        this.myLeastFrequency = myLeastFrequency;
    }
}
