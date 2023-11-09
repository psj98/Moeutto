package com.ssafy.moeutto.domain.member.controller;

import com.ssafy.moeutto.domain.member.auth.AuthTokens;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.domain.member.service.MemberLoginService;
import com.ssafy.moeutto.domain.member.service.OAuthLoginService;
import com.ssafy.moeutto.global.response.BaseException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberLoginService memberLoginService;
    private final OAuthLoginService oAuthLoginService;
    private final AuthTokensGenerator authTokensGenerator;

    /**
     * 카카오 로그인 : 선택사항 체크 후 인가 코드 발급
     *
     * @return
     */
    @ResponseBody
    @GetMapping("login")
    public String kakaoLogin() {
        try {
            // 인가 코드 발급
            String code = memberLoginService.getKakaoPermissionCode();

            return code;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * 발급받은 인가 코드로 카카오에 token발급받고 토큰에 담긴 사용자 정보를 이용해서 우리 서비스에 로그인 or 회원가입
     *
     * @param code
     * @return header ( Bearer accessToken ), body ( memberId )
     */
    @ResponseBody
    @PostMapping("check")
    public ResponseEntity kakaoCheck(@RequestParam(required = false) String code) throws BaseException {

        // URL에 포함된 code를 이용하여 Access Token 발급
        String accessToken = memberLoginService.KakaoAccessToken(code);

        // Access Token을 이용하여 카카오 서버에서 유저정보(이메일,닉네임,프사) 받아오기
        HashMap<String, Object> userInfo = memberLoginService.getUserInfo(accessToken);

        System.out.println("Member Controller : " + userInfo);

        String email = userInfo.get("email").toString();
        String nickname = userInfo.get("nickname").toString();

        AuthTokens tokens = oAuthLoginService.login(email, nickname);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Token", tokens.getAccessToken());

        return ResponseEntity.ok()
                .headers(headers)
                .body(authTokensGenerator.extractMemberId(tokens.getAccessToken()));
    }
}
