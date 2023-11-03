package com.ssafy.moeutto.domain.middleCategory.dto.response;

import com.ssafy.moeutto.domain.largeCategory.entity.LargeCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class MiddleCategoryDetailResponseDto {

    @NotNull
    private String id; // 카테고리 id

    @NotNull
    private String name; // 카테고리 이름

    @NotNull
    private LargeCategory largeCategory; // 대분류 카테고리

    @Builder(toBuilder = true)
    public MiddleCategoryDetailResponseDto(String id, String name, LargeCategory largeCategory) {
        this.id = id;
        this.name = name;
        this.largeCategory = largeCategory;
    }
}
