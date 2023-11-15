package com.ssafy.moeutto.domain.clothes.entity;

/**
 * 옷 가격 분석 - Interface Projection
 */
public interface IClothesAnalysisCost {

    String getLargeCategoryId(); // 대분류 카테고리 id

    Integer getPrice(); // 가격

    Integer getAmount(); // 개수
}
