package com.ssafy.moeutto.domain.member.controller;

import com.ssafy.moeutto.domain.member.service.MemberService;
import com.ssafy.moeutto.domain.middleCategory.service.MiddleCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
}
