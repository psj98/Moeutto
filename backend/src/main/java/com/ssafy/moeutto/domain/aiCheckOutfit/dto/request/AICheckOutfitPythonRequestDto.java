package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AICheckOutfitPythonRequestDto {

    private PythonRequestClothesList clothesList;

    private ClientRequestWeatherInfo weatherInfo;

    @Builder(toBuilder = true)
    public AICheckOutfitPythonRequestDto(PythonRequestClothesList clothesList, ClientRequestWeatherInfo weatherInfo) {
        this.clothesList = clothesList;
        this.weatherInfo = weatherInfo;
    }
}
