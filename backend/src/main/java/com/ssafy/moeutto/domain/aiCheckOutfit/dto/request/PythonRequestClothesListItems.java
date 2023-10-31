package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PythonRequestClothesListItems {

    String largeCategoryid;
    int clothesId;
    String season;
    String color;
    int thickness;
    String textile;
    int frequency;

}
