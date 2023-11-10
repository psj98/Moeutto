package com.ssafy.moeutto.domain.member.service;

import com.ssafy.moeutto.global.response.BaseException;

import java.util.UUID;

public interface MemberService {
    String findNicknameForSol(String email) throws BaseException;
}
