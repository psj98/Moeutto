package com.ssafy.moeutto.domain.aiCheckOutfit.entity;

import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class ClothesInAiCheckOutfit {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clothes_id")
    private Clothes clothes;

    @OneToOne
    @JoinColumn(name = "ai_check_outfit_id")
    private AiCheckOutfit aiCheckOutfit;

    @NotNull
    private String result;

    @NotNull
    private Integer fitnessNum;

    @Builder(toBuilder = true)
    public ClothesInAiCheckOutfit(Integer id, Clothes clothes, AiCheckOutfit aiCheckOutfit, String result, Integer fitnessNum){
        this.id = id;
        this.clothes = clothes;
        this.aiCheckOutfit = aiCheckOutfit;
        this.result = result;
        this.fitnessNum = fitnessNum;
    }
}
