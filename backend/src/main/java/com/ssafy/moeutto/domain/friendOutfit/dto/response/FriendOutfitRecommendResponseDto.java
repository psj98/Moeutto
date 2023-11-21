package com.ssafy.moeutto.domain.friendOutfit.dto.response;

import com.ssafy.moeutto.domain.clothesInFriendOutfit.entity.ClothesInFriendOutfit;
import com.ssafy.moeutto.domain.friendOutfit.entity.FriendOutfit;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
public class FriendOutfitRecommendResponseDto {

    @NotNull
    private FriendOutfit friendOutfit; // 추천 정보

    @NotNull
    private List<ClothesInFriendOutfit> clothesInFriendOutfit; // 추천한 옷 목록

    @Builder(toBuilder = true)
    public FriendOutfitRecommendResponseDto(FriendOutfit friendOutfit, List<ClothesInFriendOutfit> clothesInFriendOutfit) {
        this.friendOutfit = friendOutfit;
        this.clothesInFriendOutfit = clothesInFriendOutfit;
    }
}
