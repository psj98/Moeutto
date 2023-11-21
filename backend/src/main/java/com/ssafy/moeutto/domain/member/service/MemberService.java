package com.ssafy.moeutto.domain.member.service;

import com.ssafy.moeutto.domain.member.dto.request.MemberUpdateMyInfoRequestDto;
import com.ssafy.moeutto.domain.member.dto.response.MemberMyPageResponseDto;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface MemberService {

    String findNicknameForSol(String email) throws BaseException;

    MemberMyPageResponseDto giveMyPageInfo(UUID memberId) throws BaseException;

    /**
     * 회원 정보를 수정합니다.
     *
     * @param memberId
     * @param memberUpdateMyInfoRequestDto
     * @throws BaseException
     */
    void updateMyPageInfo(UUID memberId, MemberUpdateMyInfoRequestDto memberUpdateMyInfoRequestDto, MultipartFile file, String token) throws BaseException;
}
