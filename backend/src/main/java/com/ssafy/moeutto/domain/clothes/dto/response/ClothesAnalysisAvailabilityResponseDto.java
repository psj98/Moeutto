package com.ssafy.moeutto.domain.clothes.dto.response;


import com.ssafy.moeutto.domain.clothes.entity.IMyAnalysisAmount;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ClothesAnalysisAvailabilityResponseDto {
    private Long totalAmount;
    private Long usedAmount;
    private List<IMyAnalysisAmount> analysisAmountList;


    @Builder(toBuilder = true)
    public ClothesAnalysisAvailabilityResponseDto(Long totalAmount, Long usedAmount, List<IMyAnalysisAmount> analysisAmountList) {
        this.totalAmount = totalAmount;
        this.usedAmount = usedAmount;
        this.analysisAmountList = analysisAmountList;
    }



}
