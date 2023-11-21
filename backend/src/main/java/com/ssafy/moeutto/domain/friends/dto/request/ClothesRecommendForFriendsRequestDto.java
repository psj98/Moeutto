package com.ssafy.moeutto.domain.friends.dto.request;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
public class ClothesRecommendForFriendsRequestDto {

    @NotNull
    private String email;
    @NotNull
    private String comment;
    @NotNull
    private List<ClothesRecommendListRequestDto> clothesList;

}
