package com.ssafy.moeutto.domain.clothes.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ClothesListByFriendsRequestDto {

    @NotNull
    private String email; // 이메일

    @NotNull
    private String categoryId; // 카테고리 아이디

    @NotNull
    private String sortBy; // 정렬 기준

    @NotNull
    private Integer orderBy; // 정렬 순서

    @Builder(toBuilder = true)
    public ClothesListByFriendsRequestDto(String email, String categoryId, String sortBy, Integer orderBy) {
        this.email = email;
        this.categoryId = categoryId;
        this.sortBy = sortBy;
        this.orderBy = orderBy;
    }
}
