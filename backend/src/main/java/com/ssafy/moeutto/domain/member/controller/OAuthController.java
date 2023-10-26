package com.ssafy.moeutto.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class OAuthController {

    @ResponseBody
    @GetMapping("kakao")
    public void kakaoCallback(@RequestParam String code){
        log.info("code : "+code);
    }

}
