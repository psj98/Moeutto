package com.ssafy.moeutto.domain.calendar.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
public class CalendarListResponseDto {

    @NotNull
    private List<CalendarResponseDto> calendarList;




    @Builder(toBuilder = true)
    public CalendarListResponseDto(List<CalendarResponseDto> calendarList){
        this.calendarList = calendarList;
    }

}
