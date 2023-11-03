package com.ssafy.moeutto.domain.guestBook.dto.response;

import com.ssafy.moeutto.domain.guestBook.entity.GuestBook;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class GuestBookRegistResponseDto {

    @NotNull
    private GuestBook guestBook; // 방명록 정보

    @Builder(toBuilder = true)
    public GuestBookRegistResponseDto(GuestBook guestBook) {
        this.guestBook = guestBook;
    }
}
