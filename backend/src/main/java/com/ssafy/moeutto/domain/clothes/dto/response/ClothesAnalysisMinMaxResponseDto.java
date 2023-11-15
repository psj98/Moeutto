package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisAmount;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 옷 미니멀 / 맥시멀 분석 Response Dto
 */
@Getter
@NoArgsConstructor
public class ClothesAnalysisMinMaxResponseDto {

    @NotNull
    private Long myTotalAmount; // 내 옷장에 있는 옷 총 개수

    @NotNull
    private List<IClothesAnalysisAmount> myAnalysisAmount; // 내 옷장에 있는 카테고리 별 옷 개수

    @NotNull
    private Long userTotalAmountAvg; // 사용자 평균 옷 총 개수

    @Builder(toBuilder = true)
    public ClothesAnalysisMinMaxResponseDto(Long myTotalAmount, List<IClothesAnalysisAmount> myAnalysisAmount, Long userTotalAmountAvg) {
        this.myTotalAmount = myTotalAmount;
        this.myAnalysisAmount = myAnalysisAmount;
        this.userTotalAmountAvg = userTotalAmountAvg;
    }
}
