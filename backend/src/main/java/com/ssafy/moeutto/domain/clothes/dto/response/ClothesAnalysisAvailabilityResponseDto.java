package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisAvailability;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 옷 활용도 분석 Response Dto
 */
@Getter
@NoArgsConstructor
public class ClothesAnalysisAvailabilityResponseDto {

    @NotNull
    private Long totalAmount; // 전체 옷 개수

    @NotNull
    private Long usedAmount; // 최근 n개월 내 입은 옷 개수

    @NotNull
    private List<IClothesAnalysisAvailability> analysisAmountList; // 최근 n개월 내 입은 옷 개수 - 대분류 카테고리 기준

    @NotNull
    private String maxLargeCategoryName; // 옷이 가장 많은 대분류 카테고리

    @NotNull
    private String minLargeCategoryName; // 옷이 가장 적은 대분류 카테고리

    @Builder(toBuilder = true)
    public ClothesAnalysisAvailabilityResponseDto(Long totalAmount, Long usedAmount, List<IClothesAnalysisAvailability> analysisAmountList, String maxLargeCategoryName, String minLargeCategoryName) {
        this.totalAmount = totalAmount;
        this.usedAmount = usedAmount;
        this.analysisAmountList = analysisAmountList;
        this.maxLargeCategoryName = maxLargeCategoryName;
        this.minLargeCategoryName = minLargeCategoryName;
    }
}
