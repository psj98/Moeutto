package com.ssafy.moeutto.domain.calendar.dto.response;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CalendarResponseDto {

    @NotNull
    private Integer id;
    @NotNull
    private String imageUrl;
    @NotNull
    private Integer likeOutfit;
    @NotNull
    private Date regDate;

    @Builder(toBuilder = true)
    public CalendarResponseDto(Integer id, String imageUrl, Integer likeOutfit, Date regDate) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.likeOutfit = likeOutfit;
        this.regDate = regDate;
    }
}
