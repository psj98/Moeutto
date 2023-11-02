package com.ssafy.moeutto.domain.aiCheckOutfit.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.DateTime;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class AICheckOutfitClientResponseDto {

    int id;
    Date regDate;
    List<ClientResponseClothesResult> clothesResult;
    ResponseClothesFeature clothesFeature;
    ResponseWeatherInfo weatherInfo;

    @Builder(toBuilder = true)
    public AICheckOutfitClientResponseDto(int id, Date regDate, List<ClientResponseClothesResult> clothesResult,
                                          ResponseClothesFeature clothesFeature, ResponseWeatherInfo weatherInfo){
        this.id = id;
        this.regDate = regDate;
        this.clothesResult = clothesResult;
        this.clothesFeature = clothesFeature;
        this.weatherInfo = weatherInfo;
    }

}
