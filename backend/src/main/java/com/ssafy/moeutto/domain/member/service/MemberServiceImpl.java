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

    /**
     * 솔이가 요청한 닉네임 검색 API 입니다.
     *
     * @param email
     * @return
     * @throws BaseException
     */
    @Override
    public String findNicknameForSol(String email) throws BaseException {
        Member friends = memberRepository.findByEmail(email).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        return friends.getNickname();
    }

    /**
     * 회원 정보를 조회합니다.
     *
     * @param memberId
     * @return MemberMyPageResponseDto
     * @throws BaseException
     */
    @Override
    public MemberMyPageResponseDto giveMyPageInfo(UUID memberId) throws BaseException {
        // 사용자 정보 체크
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.CANT_GET_MEMBER_INFO));

        return MemberMyPageResponseDto.builder()
                .imageUrl(member.getProfileImage())
                .nickname(member.getNickname())
                .closetFind(member.isClosetFind())
                .accountFind(member.isAccountFind())
                .build();
    }

    /**
     * 회원 정보를 수정합니다.
     *
     * @param memberId
     * @param memberUpdateMyInfoRequestDto
     * @throws BaseException
     */
    @Override
    public void updateMyPageInfo(UUID memberId, MemberUpdateMyInfoRequestDto memberUpdateMyInfoRequestDto) throws BaseException {
        if (memberUpdateMyInfoRequestDto.getNickname().length() > 8) {
            throw new BaseException(BaseResponseStatus.NICKNAME_OVER_LENGTH_EIGHT);
        }

        Member baseMember = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        Member fixMember = baseMember.toBuilder()
                .profileImage(memberUpdateMyInfoRequestDto.getImageUrl())
                .nickname(memberUpdateMyInfoRequestDto.getNickname())
                .accountFind(memberUpdateMyInfoRequestDto.isAccountFind())
                .closetFind(memberUpdateMyInfoRequestDto.isClosetFind())
                .build();

        memberRepository.save(fixMember);
    }
}
