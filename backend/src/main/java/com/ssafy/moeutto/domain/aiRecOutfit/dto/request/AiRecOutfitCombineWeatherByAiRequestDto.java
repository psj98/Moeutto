package com.ssafy.moeutto.domain.aiRecOutfit.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@NoArgsConstructor
@ToString
public class AiRecOutfitCombineWeatherByAiRequestDto {

    // 날씨 정보
    @NotNull
    private Float tmn; // 최저 기온

    @NotNull
    private Float tmx; // 최고 기온

    @NotNull
    private Float wsd; // 풍속

    @NotNull
    private Date date; // 날짜 정보

    @Builder(toBuilder = true)
    public AiRecOutfitCombineWeatherByAiRequestDto(Float tmn, Float tmx, Float wsd, Date date) {
        this.tmn = tmn;
        this.tmx = tmx;
        this.wsd = wsd;
        this.date = date;
    }
}
