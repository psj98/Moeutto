package com.ssafy.moeutto.domain.member.service;

import com.ssafy.moeutto.domain.member.auth.AuthTokens;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthLoginService {

    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;

    /**
     * 우리 서비스에 로그인 시키기
     * @param member
     * @return
     */
    public AuthTokens login(Member member){
        Long memberId = findOrCreateMember(member);

        return authTokensGenerator.generate(memberId);
    }

    /**
     * 카카오 로그인 유저가 이미 멤버면 로그인, 멤버가 아니면 가입 시키고 로그인
     * @param member
     * @return
     */
    private Long findOrCreateMember(Member member){

        Member findMember = memberRepository.findMemberByEmail(member.getEmail().toString());

        System.out.println("findMember : "+findMember);

        System.out.println("member.getId and Email : "+member.getId() + " "+member.getEmail());

        if(findMember == null){
            return newMember(member);
        }else{
            return findMember.getId();
        }

    }

    /**
     * 멤버가 아니어서 가입시키는 메소드
     * @param member
     * @return
     */
    private Long newMember(Member member){
        Member regist = Member.builder()
                .email(member.getEmail().toString())
                .nickname(member.getNickname().toString())
                .build();

        return memberRepository.save(regist).getId();
    }

}
