package com.ssafy.moeutto.domain.aiCheckOutfit.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class AICheckOutfit {

    @Id
    private Integer id;

    @Builder(toBuilder = true)
    public AICheckOutfit(Integer id) {
        this.id = id;
    }
}
