package com.ssafy.moeutto.domain.largeCategory.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class LargeCategory {

    @Id
    private Integer id;

    @Builder(toBuilder = true)
    public LargeCategory(Integer id) {
        this.id = id;
    }
}
