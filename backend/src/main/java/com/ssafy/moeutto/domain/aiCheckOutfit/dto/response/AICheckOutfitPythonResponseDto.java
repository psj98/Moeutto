package com.ssafy.moeutto.domain.aiCheckOutfit.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AICheckOutfitPythonResponseDto {

    List<PythonResponseClothesResult> clothesResult;
    ResponseClothesFeature clothesFeature;
    ResponseWeatherInfo weatherInfo;

    @Builder(toBuilder = true)
    public AICheckOutfitPythonResponseDto(List<PythonResponseClothesResult> clothesResult, ResponseClothesFeature clothesFeature,
                                          ResponseWeatherInfo weatherInfo){
        this.clothesResult = clothesResult;
        this.clothesFeature = clothesFeature;
        this.weatherInfo = weatherInfo;
    }

}
