package com.ssafy.moeutto.domain.clothes.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ClothesListRequestDto {

    private String categoryId; // 카테고리 아이디

    private String sortBy; // 정렬 기준

    private Integer orderBy; // 정렬 순서
}
