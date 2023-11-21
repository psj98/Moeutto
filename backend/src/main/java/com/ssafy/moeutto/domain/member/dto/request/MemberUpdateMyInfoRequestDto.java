package com.ssafy.moeutto.domain.member.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberUpdateMyInfoRequestDto {

    private String nickname;

    private String imageUrl;

    private boolean closetFind;

    private boolean accountFind;

    @Builder(toBuilder = true)
    public MemberUpdateMyInfoRequestDto(String nickname, String imageUrl, boolean closetFind, boolean accountFind) {
        this.nickname = nickname;
        this.imageUrl = imageUrl;
        this.closetFind = closetFind;
        this.accountFind = accountFind;
    }
}
