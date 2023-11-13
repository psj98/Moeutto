package com.ssafy.moeutto.domain.aiRecOutfit.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@NoArgsConstructor
public class AiRecOutfitCombineRequestDto {

    // 날씨 정보
    @NotNull
    private Integer sky; // 날씨 상태

    @NotNull
    private Integer pty; // 강수 상태

    @NotNull
    private Float tmn; // 최저 기온

    @NotNull
    private Float tmx; // 최고 기온

    @NotNull
    private Float wsd; // 풍속

    @NotNull
    private Date date; // 날짜 정보
}
