package com.ssafy.moeutto.domain.friends.entity;


import lombok.Builder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


public class ClothesInFriendsOutfit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotNull
    private Integer clothesId;

    @Builder(toBuilder = true)
    public ClothesInFriendsOutfit(Integer id, Integer clothesId) {
        this.id = id;
        this.clothesId = clothesId;
    }
}
