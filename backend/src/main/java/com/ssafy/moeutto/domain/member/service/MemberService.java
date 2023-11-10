package com.ssafy.moeutto.domain.member.service;

import com.ssafy.moeutto.domain.member.dto.request.MemberUpdateMyInfoRequestDto;
import com.ssafy.moeutto.domain.member.dto.response.MemberMyPageResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

public interface MemberService {
    MemberMyPageResponseDto giveMypageInfo(String token) throws BaseException;

    void updateMypageInfo(String token, MemberUpdateMyInfoRequestDto memberUpdateMyInfoRequestDto) throws BaseException;
}
