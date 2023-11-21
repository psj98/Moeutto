package com.ssafy.moeutto.domain.friends.dto.request;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ClothRecommendForFriendsRequestDto {

    @NotNull
    private UUID clothId;
    @NotNull
    private String email;
    @NotNull
    private String comment;
    @NotNull
    private Date writeDate;


    @Builder(toBuilder = true)
    public ClothRecommendForFriendsRequestDto(UUID clothId, String email, String comment, Date writeDate) {
        this.clothId = clothId;
        this.email = email;
        this.comment = comment;
        this.writeDate = writeDate;
    }
}
