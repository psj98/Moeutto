package com.ssafy.moeutto.domain.aiCheckOutfit.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseWeatherInfo {

    int minTemperature;
    int maxTemperature;
    int weather; // 날씨 정보

    @Builder(toBuilder = true)
    public ResponseWeatherInfo(int minTemperature, int maxTemperature, int weather){
        this.minTemperature = minTemperature;
        this.maxTemperature = maxTemperature;
        this.weather = weather;
    }

}
