package com.ssafy.moeutto.domain.calendar.dto.response;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CalendarListResponseDto {
    private Integer id;
    private String imageUrl;
    private Integer likeOutfit;
    private LocalDateTime regDate;
}
