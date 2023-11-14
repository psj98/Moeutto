package com.ssafy.moeutto.domain.clothes.entity;

/**
 * 옷 빈도 분석 - Interface Projection
 */
public interface IClothesAnalysisFrequency {

    String getMiddleCategoryId(); // 대분류 카테고리 id

    String getSeason(); // 계절

    String getColor(); // 색상

    String getThickness(); // 두께

    Integer getPrice(); // 가격

    String getTextile(); // 소재

    Integer getFrequency(); // 빈도

    String getImageUrl(); // 이미지
}
