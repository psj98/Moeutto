package com.ssafy.moeutto.domain.aiRecOutfit.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@NoArgsConstructor
public class AiRecOutfitCombineWeatherByAiRequestDto {

    // 날씨 정보
    @NotNull
    private Double tmn; // 최저 기온

    @NotNull
    private Double tmx; // 최고 기온

    @NotNull
    private Double wsd; // 풍속

    @NotNull
    private Date date; // 날짜 정보

    @Builder(toBuilder = true)
    public AiRecOutfitCombineWeatherByAiRequestDto(Double tmn, Double tmx, Double wsd, Date date) {
        this.tmn = tmn;
        this.tmx = tmx;
        this.wsd = wsd;
        this.date = date;
    }
}
