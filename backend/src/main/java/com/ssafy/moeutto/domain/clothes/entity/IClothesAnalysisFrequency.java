package com.ssafy.moeutto.domain.clothes.entity;

import java.util.UUID;

public interface IClothesAnalysisFrequency {

    Integer getFrequency();
    String getSeason();
    String getColor();
    String getThickness();
    Integer getPrice();
    String getTextile();
    String getMiddleCategoryId();
}
