package com.ssafy.moeutto.domain.aiRecOutfit.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class AIRecOutfit {

    @Id
    private Integer id;

    @Builder(toBuilder = true)
    public AIRecOutfit(Integer id) {
        this.id = id;
    }
}
