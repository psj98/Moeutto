package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.guestBook.dto.response.GuestBookListResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * 옷 목록 + 방명록 목록 Response Dto
 */
@Getter
@NoArgsConstructor
public class ClothesListAndGuestBookResponseDto {

    @NotNull
    private List<ClothesListResponseDto> clothesListResponseDto; // 옷 목록

    @NotNull
    private List<GuestBookListResponseDto> guestBookListResponseDto; // 방명록 목록

    @Builder(toBuilder = true)
    public ClothesListAndGuestBookResponseDto(List<ClothesListResponseDto> clothesListResponseDto, List<GuestBookListResponseDto> guestBookListResponseDto) {
        this.clothesListResponseDto = clothesListResponseDto;
        this.guestBookListResponseDto = guestBookListResponseDto;
    }
}
