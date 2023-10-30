package com.ssafy.moeutto.domain.calendar.dto.request;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Getter
@NoArgsConstructor
@ToString
public class CalendarRegistRequestDto {

    String imageUrl;

    @Builder(toBuilder = true)
    public CalendarRegistRequestDto(String imageUrl) {

        this.imageUrl = imageUrl;
    }
}
