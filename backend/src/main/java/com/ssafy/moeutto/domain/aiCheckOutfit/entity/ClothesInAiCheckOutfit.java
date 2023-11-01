package com.ssafy.moeutto.domain.aiCheckOutfit.entity;

import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class ClothesInAiCheckOutfit {

    // 외래키가 복합키이며 PK 인 테이블 구성
    // 쭈니쭈니한테 채찍맞으면서 배워봐야할듯

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private Clothes clothes;

    @Id
    @OneToOne
    @JoinColumn(name = "id")
    private AiCheckOutfit aiCheckOutfit;

}
