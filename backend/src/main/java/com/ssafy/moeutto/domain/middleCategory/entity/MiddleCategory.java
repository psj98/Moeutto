package com.ssafy.moeutto.domain.middleCategory.entity;

import com.ssafy.moeutto.domain.largeCategory.entity.LargeCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
public class MiddleCategory {

    @Id
    private String id; // 카테고리 id

    @OneToOne
    @JoinColumn(name = "large_category_id")
    private LargeCategory largeCategory; // 대분류 카테고리

    @NotNull
    private String name; // 카테고리 이름

    @Builder(toBuilder = true)
    public MiddleCategory(String id, LargeCategory largeCategory, String name) {
        this.id = id;
        this.largeCategory = largeCategory;
        this.name = name;
    }
}
