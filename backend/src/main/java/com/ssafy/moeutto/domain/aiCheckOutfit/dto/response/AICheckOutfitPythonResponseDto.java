package com.ssafy.moeutto.domain.aiCheckOutfit.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class AICheckOutfitPythonResponseDto {

    List<PythonResponseClothesResult> clothesResult;
    PythonResponseClothesFeature clothesFeature;
    PythonResponseWeatherInfo weatherInfo;

    @Builder(toBuilder = true)
    public AICheckOutfitPythonResponseDto(List<PythonResponseClothesResult> clothesResult, PythonResponseClothesFeature clothesFeature,
                                          PythonResponseWeatherInfo weatherInfo){
        this.clothesResult = clothesResult;
        this.clothesFeature = clothesFeature;
        this.weatherInfo = weatherInfo;
    }

}
