package com.ssafy.moeutto.domain.clothes.entity;

/**
 * 옷 계절 분석 - Interface Projection
 */
public interface IClothesAnalysisSeason {

    String getLargeCategoryId(); // 대분류 카테고리 id

    Integer getAmount(); // 개수
}
