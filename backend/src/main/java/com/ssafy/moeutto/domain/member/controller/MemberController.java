package com.ssafy.moeutto.domain.member.controller;

import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.service.MemberLoginService;
import com.ssafy.moeutto.domain.member.service.OAuthLoginService;
import jdk.jfr.Category;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    /**
     * 카카오 로그인 : 선택사항 체크 후 인가 코드 발급
     * @return
     */
    @ResponseBody
    @GetMapping("login")
    public String kakaoLogin(){
        try{
            // 인가 코드 발급
            String code = memberLoginService.getKakaoPermissionCode();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "Permission OK";
    }

    /**
     * 발급받은 인가코드로 Kakao AccessToken과 RefreshToken 받아오고 Member entity로 Parsing 후 우리 서비스에 로그인
     * @param code
     * @return
     */
    @ResponseBody
    @PostMapping("check")
    public ResponseEntity kakaoCheck(@RequestParam(required = false) String code){

        // URL에 포함된 code를 이용하여 Access Token 발급
        String accessToken = memberLoginService.KakaoAccessToken(code);

        // Access Token을 이용하여 카카오 서버에서 유저정보(이메일,닉네임,프사) 받아오기
        HashMap<String, Object> userInfo = memberLoginService.getUserInfo(accessToken);

        System.out.println("Member Controller : "+ userInfo);

        Member member = new Member(userInfo.get("email").toString(), userInfo.get("nickname").toString());

        return ResponseEntity.ok(oAuthLoginService.login(member));
    }


}
