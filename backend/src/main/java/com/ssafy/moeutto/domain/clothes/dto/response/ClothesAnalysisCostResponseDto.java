package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.clothes.entity.IAnalysisCostItem;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
public class ClothesAnalysisCostResponseDto {

    @NotNull
    private Integer myTotalCost;
    @NotNull
    private List<IAnalysisCostItem> myAnalysisCost;
    @NotNull
    private Integer userTotalAvgCost;


    @Builder(toBuilder = true)
    public ClothesAnalysisCostResponseDto(Integer myTotalCost, List<IAnalysisCostItem> myAnalysisCost, Integer userTotalAvgCost) {
        this.myTotalCost = myTotalCost;
        this.myAnalysisCost = myAnalysisCost;
        this.userTotalAvgCost = userTotalAvgCost;
    }



}
