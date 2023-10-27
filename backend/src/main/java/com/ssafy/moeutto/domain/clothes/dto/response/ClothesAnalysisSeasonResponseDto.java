package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisColor;
import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisSeason;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
public class ClothesAnalysisSeasonResponseDto {

//    @NotNull
//    private List<IClothesAnalysisSeason> springClothes; // 내 옷장 분석
//
//    @NotNull
//    private List<IClothesAnalysisSeason> summerClothes; // 내 옷장 분석
//
//    @NotNull
//    private List<IClothesAnalysisSeason> autumnClothes; // 내 옷장 분석
//
//    @NotNull
//    private List<IClothesAnalysisSeason> winterClothes; // 내 옷장 분석

    @NotNull
    private List<List<IClothesAnalysisSeason>> seasonClothes;

    @Builder(toBuilder = true)
    public ClothesAnalysisSeasonResponseDto(List<List<IClothesAnalysisSeason>> seasonClothes) {
        this.seasonClothes = seasonClothes;
    }
}
