package com.ssafy.moeutto.domain.member.controller;

import com.ssafy.moeutto.domain.member.service.MemberLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberLoginService memberLoginService;

    @ResponseBody
    @GetMapping("login")
    public String kakaoLogin(){
        try{
            // 인가 코드 발급
            String code = memberLoginService.getKakaoPermissionCode();
//                String code = "BRFCHw1Yoq9KYwSt-TYTQb-AfrokNzbEsITNR18s0fevLksqClwoaNmcpMQKKw0eAAABi2m-do_mTYKY7N6ACw";

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "Permission OK";
    }

    @ResponseBody
    @PostMapping("check")
    public String kakaoCheck(@RequestParam(required = false) String code){

        // URL에 포함된 code를 이용하여 Access Token 발급
        String accessToken = memberLoginService.KakaoAccessToken(code);
        System.out.println("accessToken : "+accessToken);
        // Access Token을 이용하여 카카오 서버에서 유저정보(이메일,닉네임,프사) 받아오기
//        HashMap<String, Object> userInfo = memberLoginService.getUserInfo(accessToken);
//        System.out.println("Member Controller : "+ userInfo);

        return "Token OK";
    }

//    // info 확인용 테스트 api
//    @GetMapping("info")
//    public String kakaoInfo(){
//
//        return "info";
//    }


}
