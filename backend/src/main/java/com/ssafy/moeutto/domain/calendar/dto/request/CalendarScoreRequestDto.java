package com.ssafy.moeutto.domain.calendar.dto.request;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class CalendarScoreRequestDto {

    //착장 Id;
    @NotNull
    private Integer id;
    private Integer likeOutfit;

    @Builder(toBuilder = true)
    public CalendarScoreRequestDto(Integer id, Integer likeOutfit) {
        this.id = id;
        this.likeOutfit = likeOutfit;
    }
}
