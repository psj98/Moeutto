package com.ssafy.moeutto.domain.middleCategory.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class MiddleCategoryByLargeCategoryResponseDto {

    @NotNull
    private String id; // 카테고리 id

    @NotNull
    private String name; // 카테고리 이름

    @Builder(toBuilder = true)
    public MiddleCategoryByLargeCategoryResponseDto(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
