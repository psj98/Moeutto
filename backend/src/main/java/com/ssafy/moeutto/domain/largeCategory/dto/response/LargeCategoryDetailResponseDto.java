package com.ssafy.moeutto.domain.largeCategory.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class LargeCategoryDetailResponseDto {

    @NotNull
    private String id; // 카테고리 id

    @NotNull
    private String name; // 카테고리 이름

    @Builder(toBuilder = true)
    public LargeCategoryDetailResponseDto(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
