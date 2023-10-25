package com.ssafy.moeutto.domain.largeCategory.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
public class LargeCategory {

    @Id
    private String id; // 카테고리 id

    @NotNull
    private String name; // 카테고리 이름

    @Builder(toBuilder = true)
    public LargeCategory(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
