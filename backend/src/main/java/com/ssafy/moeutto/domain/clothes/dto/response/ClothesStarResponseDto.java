package com.ssafy.moeutto.domain.clothes.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 옷 즐겨찾기 여부 Response Dto
 */
@Getter
@NoArgsConstructor
public class ClothesStarResponseDto {

    @NotNull
    private Integer id; // 옷 id

    @NotNull
    private Integer star; // 즐겨찾기 여부

    @Builder(toBuilder = true)
    public ClothesStarResponseDto(Integer id, Integer star) {
        this.id = id;
        this.star = star;
    }
}
