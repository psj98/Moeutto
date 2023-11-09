package com.ssafy.moeutto.domain.member.service;

import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.domain.member.dto.request.MemberUpdateMyInfoRequestDto;
import com.ssafy.moeutto.domain.member.dto.response.MemberMyPageResponseDto;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;

    @Override
    public MemberMyPageResponseDto giveMypageInfo(String token) throws BaseException {

        UUID memberId = authTokensGenerator.extractMemberId(token);

        Member member = memberRepository.findById(memberId).orElseThrow(()-> new BaseException(BaseResponseStatus.CANT_GET_MEMBER_INFO));

        MemberMyPageResponseDto memberMyPageResponseDto = MemberMyPageResponseDto.builder()
                .imageUrl(member.getProfileImage())
                .nickname(member.getNickname())
                .closetFind(member.isClosetFind())
                .accountFind(member.isAccountFind())
                .build();

        System.out.println(memberMyPageResponseDto);

        return memberMyPageResponseDto;
    }

    @Override
    public void updateMypageInfo(String token, MemberUpdateMyInfoRequestDto memberUpdateMyInfoRequestDto) throws BaseException {
        UUID memberId = authTokensGenerator.extractMemberId(token);

        Member baseMember = memberRepository.findById(memberId).orElseThrow(()-> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        Member fixMember = baseMember.toBuilder()
                .profileImage(memberUpdateMyInfoRequestDto.getImageUrl())
                .nickname(memberUpdateMyInfoRequestDto.getNickname())
                .accountFind(memberUpdateMyInfoRequestDto.isAccountFind())
                .closetFind(memberUpdateMyInfoRequestDto.isClosetFind())
                .build();

        memberRepository.save(fixMember);
    }


}
