package com.ssafy.moeutto.domain.clothes.entity;

public interface IClothesAnalysisAvailability {

    String getLargeCategoryId(); // 대분류 카테고리 id

    Integer getTotalAmount(); // 전체 옷 개수

    Integer getUsedAmount(); // 최근 n개월 내 입은 옷 개수
}
