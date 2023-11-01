package com.ssafy.moeutto.domain.aiRecOutfit.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@NoArgsConstructor
public class AIRecOutfitCombineRequestDto {

    // 날씨 정보
    @NotNull
    private Integer skyStatus;

    @NotNull
    private Integer precipitationType; // 강수 상태

    @NotNull
    private Double minTemperature; // 최저 기온

    @NotNull
    private Double maxTemperature; // 최고 기온

    @NotNull
    private Double windSpeed; // 풍속

    @NotNull
    private Date date; // 날짜 정보
}
