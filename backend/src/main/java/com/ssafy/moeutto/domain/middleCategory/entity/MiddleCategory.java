package com.ssafy.moeutto.domain.middleCategory.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class MiddleCategory {

    @Id
    private Integer id;

    @Builder(toBuilder = true)
    public MiddleCategory(Integer id) {
        this.id = id;
    }
}
