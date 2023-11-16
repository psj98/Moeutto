package com.ssafy.moeutto.domain.calendar.dto.response;

import com.ssafy.moeutto.domain.calendar.entity.Calendar;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CalendarRegistResponseDto {

    private Calendar calendar;

    @Builder(toBuilder = true)
    public CalendarRegistResponseDto(Calendar calendar) {
        this.calendar = calendar;
    }
}
