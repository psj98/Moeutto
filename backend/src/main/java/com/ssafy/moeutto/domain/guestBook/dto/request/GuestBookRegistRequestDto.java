package com.ssafy.moeutto.domain.guestBook.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class GuestBookRegistRequestDto {

    @NotNull
    private String ownerEmail; // 옷장 주인 이메일

    @NotNull
    private String post; // 방명록 글
}
