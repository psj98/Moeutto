package com.ssafy.moeutto.domain.clothes.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Clothes {

    @Id
    private Integer id;

    @Builder(toBuilder = true)
    public Clothes(Integer id) {
        this.id = id;
    }
}
