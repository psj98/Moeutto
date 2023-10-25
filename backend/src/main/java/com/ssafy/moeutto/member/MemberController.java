package com.ssafy.moeutto.member;

import com.ssafy.moeutto.member.service.MemberLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Objects;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {

    private final MemberLoginService memberLoginService;

    @ResponseBody
    @GetMapping("/login")
    public String kakaoLogin(@RequestParam(required = false) String code){
        try{
            // URL에 포함된 code를 이용하여 Access Token 발급
            String accessToken = memberLoginService.getKakaoAccessToken(code);

            // Access Token을 이용하여 카카오 서버에서 유저정보(이메일,닉네임,프사) 받아오기
            HashMap<String, Object> userInfo = memberLoginService.getUserInfo(accessToken);
            System.out.println("Member Controller : "+ userInfo);





        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
