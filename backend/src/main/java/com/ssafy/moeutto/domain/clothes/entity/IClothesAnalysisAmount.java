package com.ssafy.moeutto.domain.clothes.entity;

/**
 * 옷 미니멀 / 맥시멀 분석 - Interface Projection
 */
public interface IClothesAnalysisAmount {

    String getLargeCategoryId(); // 대분류 카테고리 id

    Integer getAmount(); // 대분류 카테고리 별 개수
}
