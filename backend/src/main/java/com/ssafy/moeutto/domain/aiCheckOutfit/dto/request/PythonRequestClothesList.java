package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PythonRequestClothesList {

    PythonRequestClothesListItems outer;
    PythonRequestClothesListItems top;
    PythonRequestClothesListItems bottom;
    PythonRequestClothesListItems item;
    ClientRequestWeatherInfo weatherInfo;
    @Builder(toBuilder = true)
    public PythonRequestClothesList(PythonRequestClothesListItems outer, PythonRequestClothesListItems top,
                                    PythonRequestClothesListItems bottom, PythonRequestClothesListItems item,
                                    ClientRequestWeatherInfo weatherInfo){
        this.outer = outer;
        this.top = top;
        this.bottom = bottom;
        this.item = item;
        this.weatherInfo = weatherInfo;
    }

}
