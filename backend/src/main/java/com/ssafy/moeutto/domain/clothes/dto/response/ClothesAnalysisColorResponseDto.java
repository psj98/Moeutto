package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisColor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 옷 색상 분석 Response Dto
 */
@Getter
@NoArgsConstructor
public class ClothesAnalysisColorResponseDto {

    @NotNull
    private List<IClothesAnalysisColor> myAnalysisColor; // 내 옷장 분석

    @NotNull
    private List<IClothesAnalysisColor> userAnalysisColor; // 모든 사용자 옷장 분석

    @Builder(toBuilder = true)
    public ClothesAnalysisColorResponseDto(List<IClothesAnalysisColor> myAnalysisColor, List<IClothesAnalysisColor> userAnalysisColor) {
        this.myAnalysisColor = myAnalysisColor;
        this.userAnalysisColor = userAnalysisColor;
    }
}
