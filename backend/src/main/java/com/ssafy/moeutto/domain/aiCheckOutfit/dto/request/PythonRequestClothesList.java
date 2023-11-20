package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import com.ssafy.moeutto.domain.aiCheckOutfit.dto.response.ResponseWeatherInfo;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PythonRequestClothesList {

    private PythonRequestClothesListItems outer;

    private PythonRequestClothesListItems top;

    private PythonRequestClothesListItems bottom;

    private PythonRequestClothesListItems item;

    private ResponseWeatherInfo weatherInfo;

    @Builder(toBuilder = true)
    public PythonRequestClothesList(PythonRequestClothesListItems outer, PythonRequestClothesListItems top,
                                    PythonRequestClothesListItems bottom, PythonRequestClothesListItems item,
                                    ResponseWeatherInfo weatherInfo) {
        this.outer = outer;
        this.top = top;
        this.bottom = bottom;
        this.item = item;
        this.weatherInfo = weatherInfo;
    }
}
