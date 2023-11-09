package com.ssafy.moeutto.domain.member.service;

import com.ssafy.moeutto.domain.S3.service.S3Service;
import com.ssafy.moeutto.domain.member.auth.AuthTokens;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OAuthLoginService {

    private final MemberRepository memberRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final S3Service s3Service;

    /**
     * 우리 서비스에 로그인 시키기
     *
     * @param email
     * @param nickname
     * @return
     */
    public AuthTokens login(String email, String nickname) throws BaseException {
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
    private UUID findOrCreateMember(String email, String nickname) throws BaseException {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);

        if (!memberOptional.isPresent()) {
            return newMember(email, nickname);
        }

        System.out.println("findMember : " + memberOptional.get());

        return memberOptional.get().getId();
    }

    /**
     * 멤버가 아니어서 가입시키는 메소드
     *
     * @param email
     * @param nickname
     * @return
     */
    private UUID newMember(String email, String nickname) throws BaseException {
        UUID id = UUID.randomUUID();

        Member regist = Member.builder()
                .id(id)
                .email(email)
                .nickname(nickname)
                .build();

        try {
            s3Service.createFolder(id.toString());
        } catch (BaseException e) {
            throw new BaseException(BaseResponseStatus.S3_FOLDER_MAKE_ERROR);
        }

        return memberRepository.save(regist).getId();
    }
}
