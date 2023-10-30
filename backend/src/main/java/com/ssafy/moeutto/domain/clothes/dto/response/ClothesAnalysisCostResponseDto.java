package com.ssafy.moeutto.domain.clothes.dto.response;

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
    private List<AnalysisCostItem> myAnalysisCost;
    @NotNull
    private Integer userTotalAvgCost;


    @Builder(toBuilder = true)
    public ClothesAnalysisCostResponseDto(Integer myTotalCost, List<AnalysisCostItem> myAnalysisCost, Integer userTotalAvgCost) {
        this.myTotalCost = myTotalCost;
        this.myAnalysisCost = myAnalysisCost;
        this.userTotalAvgCost = userTotalAvgCost;
    }

    @Getter
    @NoArgsConstructor
    public static class AnalysisCostItem {

        @NotNull
        private String largeCategoryId;
        @NotNull
        private Integer price;
        @NotNull
        private Integer amount;


        @Builder(toBuilder = true)
        public AnalysisCostItem(String largeCategoryId, Integer price, Integer amount) {
            this.largeCategoryId = largeCategoryId;
            this.price = price;
            this.amount = amount;
        }


    }



}
