package com.ssafy.moeutto.domain.member.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 사용자에게 내려주는 서비스의 인증 토큰 값
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthTokens {

    private String accessToken;
    private String refreshToken;
//    private String grantType;
    private Long expiresIn;


    //    public static AuthTokens of(String accessToken, String refreshToken, String grantType, Long expiresIn) {
//        return new AuthTokens(accessToken, refreshToken, grantType, expiresIn);
//    }
    public static AuthTokens of(String accessToken, String refreshToken, Long expiresIn){
        return new AuthTokens(accessToken, refreshToken, expiresIn);
    }


}
