package com.ssafy.moeutto.domain.clothes.entity;

import java.util.Date;

public interface IClothesAIRecOutfitCombine {

    Integer getId(); // 옷 정보 id

    String getSeason(); // 계절

    String getColor(); // 색상

    Integer getThickness(); // 두께

    String getTextile(); // 소재

    Integer getFrequency(); // 빈도

    Date getRecentDate(); // 최근입은 날짜
}
