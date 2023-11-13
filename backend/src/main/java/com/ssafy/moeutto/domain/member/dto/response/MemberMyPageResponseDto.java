package com.ssafy.moeutto.domain.member.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberMyPageResponseDto {

    private String nickname;
    private String imageUrl;
    private boolean closetFind;
    private boolean accountFind;

    @Builder(toBuilder = true)
    public MemberMyPageResponseDto(String nickname, String imageUrl, boolean closetFind, boolean accountFind) {
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.closetFind = closetFind;
        this.accountFind = accountFind;
    }
}
