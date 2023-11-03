package com.ssafy.moeutto.domain.calendar.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class CalendarRegistRequestDto {

    private String imageUrl;

    @Builder(toBuilder = true)
    public CalendarRegistRequestDto(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
