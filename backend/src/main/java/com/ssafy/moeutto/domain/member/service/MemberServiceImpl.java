package com.ssafy.moeutto.domain.member.service;

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

    /**
     * 솔이가 요청한 닉네임 검색 API 입니다.
     * @param memberId
     * @param email
     * @return
     * @throws BaseException
     */
    @Override
    public String findNicknameForSol(UUID memberId, String email) throws BaseException {

        Member member = memberRepository.findById(memberId).orElseThrow(()-> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        Member friends = memberRepository.findByEmail(email).orElseThrow(()-> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));
        String nickname = friends.getNickname();

        return nickname;
    }
}
