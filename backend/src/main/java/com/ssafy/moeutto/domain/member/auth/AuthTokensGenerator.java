package com.ssafy.moeutto.domain.member.auth;

import com.ssafy.moeutto.domain.member.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * AuthTokens를 발급하는 클래스
 */
@Component
@RequiredArgsConstructor
public class AuthTokensGenerator {

    private static final String BEARER_TYPE = "Bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;    // 30분
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 2;   // 2시간

    private final JwtTokenProvider jwtTokenProvider;

    /**
     * memberId 받아 AccessToken 생성
     * @param memberId
     * @return
     */
    public AuthTokens generate(Long memberId){
        long now = (new Date()).getTime();
        Date accessTokenExpiresAt = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        Date refreshTokenExpiredAt = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);

        String subject = memberId.toString();
        String accessToken = jwtTokenProvider.generate(subject, accessTokenExpiresAt);
        String refreshToken = jwtTokenProvider.generate(subject, refreshTokenExpiredAt);

        System.out.println("Our AccessToken : "+accessToken);

        return AuthTokens.of(accessToken, refreshToken, BEARER_TYPE, ACCESS_TOKEN_EXPIRE_TIME / 1000L);

    }

    /**
     * AccessToken에서 memberId 추출
     * @param accessToken
     * @return
     */
    public Long extractMemberId(String accessToken){
        return Long.valueOf(jwtTokenProvider.extractSubject(accessToken));
    }

}
