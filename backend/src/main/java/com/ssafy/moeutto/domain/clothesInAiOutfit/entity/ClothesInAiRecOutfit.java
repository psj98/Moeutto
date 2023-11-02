package com.ssafy.moeutto.domain.clothesInAiOutfit.entity;

import com.ssafy.moeutto.domain.aiRecOutfit.entity.AiRecOutfit;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
public class ClothesInAiRecOutfit implements Serializable {

    @EmbeddedId
    private ClothesInAiRecOutfitId id;

    @MapsId("clothesId")
    @ManyToOne
    @JoinColumn(name = "clothes_id")
    private Clothes clothes; // 옷

    @MapsId("aiRecOutfitId")
    @ManyToOne
    @JoinColumn(name = "ai_rec_outfit_id")
    private AiRecOutfit aiRecOutfit; // AI 추천 착장

    @Builder(toBuilder = true)
    public ClothesInAiRecOutfit(ClothesInAiRecOutfitId id, Clothes clothes, AiRecOutfit aiRecOutfit) {
        this.id = id;
        this.clothes = clothes;
        this.aiRecOutfit = aiRecOutfit;
    }
}
