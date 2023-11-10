package com.ssafy.moeutto.domain.member.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class FindNicknameRequestDto {

    @NotNull
    String email;
}
