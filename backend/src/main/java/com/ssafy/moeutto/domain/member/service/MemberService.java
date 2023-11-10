package com.ssafy.moeutto.domain.member.service;

import com.ssafy.moeutto.domain.member.dto.request.MemberUpdateMyInfoRequestDto;
import com.ssafy.moeutto.domain.member.dto.response.MemberMyPageResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import com.ssafy.moeutto.global.response.BaseException;

import java.util.UUID;

public interface MemberService {
    MemberMyPageResponseDto giveMypageInfo(String token) throws BaseException;

    void updateMypageInfo(String token, MemberUpdateMyInfoRequestDto memberUpdateMyInfoRequestDto) throws BaseException;
    String findNicknameForSol(String email) throws BaseException;
}
