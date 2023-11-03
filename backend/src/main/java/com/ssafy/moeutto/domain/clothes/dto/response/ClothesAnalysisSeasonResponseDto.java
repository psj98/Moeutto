package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisSeason;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
public class ClothesAnalysisSeasonResponseDto {

    @NotNull
    private List<IClothesAnalysisSeason> springClothes; // 봄 옷

    @NotNull
    private List<IClothesAnalysisSeason> summerClothes; // 여름 옷

    @NotNull
    private List<IClothesAnalysisSeason> autumnClothes; // 가을 옷

    @NotNull
    private List<IClothesAnalysisSeason> winterClothes; // 겨울 옷

    @Builder(toBuilder = true)
    public ClothesAnalysisSeasonResponseDto(List<IClothesAnalysisSeason> springClothes, List<IClothesAnalysisSeason> summerClothes, List<IClothesAnalysisSeason> autumnClothes, List<IClothesAnalysisSeason> winterClothes) {
        this.springClothes = springClothes;
        this.summerClothes = summerClothes;
        this.autumnClothes = autumnClothes;
        this.winterClothes = winterClothes;
    }
}
