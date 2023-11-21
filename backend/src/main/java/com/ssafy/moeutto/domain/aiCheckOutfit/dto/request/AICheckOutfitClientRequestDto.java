package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AICheckOutfitClientRequestDto {

    private List<ClientRequestClothesListDto> clothesList;

    private ClientRequestWeatherInfo weatherInfo;

    @Builder(toBuilder = true)
    public AICheckOutfitClientRequestDto(List<ClientRequestClothesListDto> clothesList, ClientRequestWeatherInfo weatherInfo) {
        this.clothesList = clothesList;
        this.weatherInfo = weatherInfo;
    }
}
