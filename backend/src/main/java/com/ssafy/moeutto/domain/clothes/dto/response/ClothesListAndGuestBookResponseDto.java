package com.ssafy.moeutto.domain.clothes.dto.response;

import com.ssafy.moeutto.domain.guestBook.dto.response.GuestBookListResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ClothesListAndGuestBookResponseDto {

    private List<ClothesListResponseDto> clothesListResponseDto; // 옷 목록

    private List<GuestBookListResponseDto> guestBookListResponseDto; // 방명록 목록

    @Builder(toBuilder = true)
    public ClothesListAndGuestBookResponseDto(List<ClothesListResponseDto> clothesListResponseDto, List<GuestBookListResponseDto> guestBookListResponseDto) {
        this.clothesListResponseDto = clothesListResponseDto;
        this.guestBookListResponseDto = guestBookListResponseDto;
    }
}
