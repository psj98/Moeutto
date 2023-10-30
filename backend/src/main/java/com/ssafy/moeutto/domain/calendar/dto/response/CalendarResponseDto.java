package com.ssafy.moeutto.domain.calendar.dto.response;


import lombok.*;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CalendarResponseDto {
    @NotNull
    private Integer id;
    private String imageUrl;
    private Integer likeOutfit;
    private Timestamp regDate;

    @Builder(toBuilder = true)
    public CalendarResponseDto(Integer id, String imageUrl, Integer likeOutfit, Timestamp regDate ){
        this.id = id;
        this.imageUrl = imageUrl;
        this.likeOutfit = likeOutfit;
        this.regDate = regDate;
    }
}
