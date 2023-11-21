package com.ssafy.moeutto.domain.clothesInFriendOutfit.entity;

import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.domain.friendOutfit.entity.FriendOutfit;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
public class ClothesInFriendOutfit implements Serializable {

    @EmbeddedId
    private ClothesInFriendOutfitId id; // 복합키

    @MapsId("clothesId")
    @ManyToOne
    @JoinColumn(name = "clothes_id")
    private Clothes clothes; // 옷

    @MapsId("friendOutfitId")
    @ManyToOne
    @JoinColumn(name = "friend_outfit_id")
    private FriendOutfit friendOutfit; // 친구 추천 착장

    @Builder(toBuilder = true)
    public ClothesInFriendOutfit(ClothesInFriendOutfitId id, Clothes clothes, FriendOutfit friendOutfit) {
        this.id = id;
        this.clothes = clothes;
        this.friendOutfit = friendOutfit;
    }
}
