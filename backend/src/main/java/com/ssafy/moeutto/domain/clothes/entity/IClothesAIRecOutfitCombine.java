package com.ssafy.moeutto.domain.clothes.entity;

/**
 * AI 착장 추천 정보 - Interface Projection
 */
public interface IClothesAIRecOutfitCombine {

    Integer getClothesId(); // 옷 정보 id

    String getSeason(); // 계절

    String getColor(); // 색상

    Integer getThickness(); // 두께

    String getTextile(); // 소재

    Integer getFrequency(); // 빈도

    String getRecentDate(); // 최근입은 날짜
}
