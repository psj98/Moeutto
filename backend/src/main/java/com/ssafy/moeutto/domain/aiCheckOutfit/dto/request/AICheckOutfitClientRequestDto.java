package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AICheckOutfitClientRequestDto {

    List<Integer> clothesList;
    ClientRequestWeatherInfo weatherInfo;

    @Builder(toBuilder = true)
    public AICheckOutfitClientRequestDto(List<Integer> clothesList, ClientRequestWeatherInfo weatherInfo){
        this.clothesList = clothesList;
        this.weatherInfo = weatherInfo;
    }
}
