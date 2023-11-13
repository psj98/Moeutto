package com.ssafy.moeutto.domain.guestBook.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@NoArgsConstructor
public class GuestBookListResponseDto {

    @NotNull
    private String nickname;

    @NotNull
    private String post;

    @NotNull
    private Date regDate;

    @Builder(toBuilder = true)
    public GuestBookListResponseDto(String nickname, String post, Date regDate) {
        this.nickname = nickname;
        this.post = post;
        this.regDate = regDate;
    }
}
