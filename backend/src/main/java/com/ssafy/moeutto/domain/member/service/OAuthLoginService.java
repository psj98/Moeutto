package com.ssafy.moeutto.domain.member.service;

import com.ssafy.moeutto.domain.member.auth.AuthTokens;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OAuthLoginService {

    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;

    /**
     * 우리 서비스에 로그인 시키기
     *
     * @param email
     * @param nickname
     * @return
     */
    public AuthTokens login(String email, String nickname) {
        UUID memberId = findOrCreateMember(email, nickname);
        return authTokensGenerator.generate(memberId);
    }

    /**
     * 카카오 로그인 멤버가 이미 멤버면 로그인, 아니면 가입시키고 로그인
     *
     * @param email
     * @param nickname
     * @return
     */
    private UUID findOrCreateMember(String email, String nickname) {

        Member findMember = memberRepository.findMemberByEmail(email);

        System.out.println("findMember : " + findMember);

        if (findMember == null) {
            return newMember(email, nickname);
        }

        return findMember.getId();
    }

    /**
     * 멤버가 아니어서 가입시키는 메소드
     *
     * @param email
     * @param nickname
     * @return
     */
    private UUID newMember(String email, String nickname) {
        Member regist = Member.builder()
                .id(UUID.randomUUID())
                .email(email)
                .nickname(nickname)
                .build();

        return memberRepository.save(regist).getId();
    }
}
