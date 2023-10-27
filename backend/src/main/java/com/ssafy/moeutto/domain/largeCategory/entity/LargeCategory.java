package com.ssafy.moeutto.domain.largeCategory.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LargeCategory {

    @Id
    @Column(length = 3)
    private String id; // 카테고리 id

    @NotNull
    @Column(length = 20)
    private String name; // 카테고리 이름

    @Builder(toBuilder = true)
    public LargeCategory(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
