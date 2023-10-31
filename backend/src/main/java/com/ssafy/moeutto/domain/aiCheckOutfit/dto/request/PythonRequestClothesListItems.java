package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PythonRequestClothesListItems {

    String largeCategoryid;
    int clothesId;
    String season;
    String color;
    int thickness;
    String textile;
    int frequency;

    @Builder(toBuilder = true)
    public PythonRequestClothesListItems(String largeCategoryid, int clothesId, String season, String color, int thickness, String textile, int frequency){
        this.largeCategoryid = largeCategoryid;
        this.clothesId = clothesId;
        this.season = season;
        this.color = color;
        this.thickness = thickness;
        this.textile = textile;
        this.frequency = frequency;
    }

}
