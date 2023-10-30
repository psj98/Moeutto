package com.ssafy.moeutto.domain.clothes.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClothesFrequencyDto {

    String middleCategoryId;
//    String largeCategoryId;
//    String image;
    int frequency;
    String season;
    String color;
    String thickness;
    int price;
    String textile;

}
