package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 옷 수정 정보 Response Dto
 */
@Getter
@NoArgsConstructor
public class ClothesUpdateResponseDto {

    @NotNull
    private Clothes clothes; // 옷 정보

    @Builder(toBuilder = true)
    public ClothesUpdateResponseDto(Clothes clothes) {
        this.clothes = clothes;
    }
}
