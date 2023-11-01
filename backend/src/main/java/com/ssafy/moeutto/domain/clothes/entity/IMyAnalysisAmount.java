package com.ssafy.moeutto.domain.clothes.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public interface IMyAnalysisAmount {

    String getLargeCategoryId();

    Integer getTotalAmount();

    Integer getUsedAmount();


}
