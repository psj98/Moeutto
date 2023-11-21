package com.ssafy.moeutto.domain.friendOutfit.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
public class FriendOutfitRecommendRequestDto {

    @NotNull
    private String email; // 추천한 사용자 이메일

    @NotNull
    private String comment; // 한줄평

    @NotNull
    private List<Integer> clothesList; // 추천한 옷 목록
}
