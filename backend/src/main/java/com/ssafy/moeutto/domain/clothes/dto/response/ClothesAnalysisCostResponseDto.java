package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisCost;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 옷 가격 분석 Response Dto
 */
@Getter
@NoArgsConstructor
public class ClothesAnalysisCostResponseDto {

    @NotNull
    private Integer myTotalCost; // 내 옷장 총 비용

    @NotNull
    private List<IClothesAnalysisCost> myAnalysisCost; // 대분류 카테고리 별 옷 총 비용

    @NotNull
    private Integer userTotalAvgCost; // 사용자 옷 평균 비용

    @Builder(toBuilder = true)
    public ClothesAnalysisCostResponseDto(Integer myTotalCost, List<IClothesAnalysisCost> myAnalysisCost, Integer userTotalAvgCost) {
        this.myTotalCost = myTotalCost;
        this.myAnalysisCost = myAnalysisCost;
        this.userTotalAvgCost = userTotalAvgCost;
    }
}
