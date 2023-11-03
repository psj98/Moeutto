package com.ssafy.moeutto.domain.middleCategory.entity;

import com.ssafy.moeutto.domain.largeCategory.entity.LargeCategory;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MiddleCategory {

    @Id
    @Column(length = 6)
    private String id; // 카테고리 id

    @OneToOne
    @JoinColumn(name = "large_category_id")
    private LargeCategory largeCategory; // 대분류 카테고리

    @NotNull
    @Column(length = 20)
    private String name; // 카테고리 이름

    @Builder(toBuilder = true)
    public MiddleCategory(String id, LargeCategory largeCategory, String name) {
        this.id = id;
        this.largeCategory = largeCategory;
        this.name = name;
    }
}
