package com.ssafy.moeutto.domain.member.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberUpdateMyInfoRequestDto {

    private String nickname;

    private boolean closetFind;

    private boolean accountFind;

    @Builder(toBuilder = true)
    public MemberUpdateMyInfoRequestDto(String nickname, boolean closetFind, boolean accountFind) {
        this.nickname = nickname;
        this.closetFind = closetFind;
        this.accountFind = accountFind;
    }
}
