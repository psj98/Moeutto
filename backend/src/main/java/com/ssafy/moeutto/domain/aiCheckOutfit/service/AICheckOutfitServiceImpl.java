package com.ssafy.moeutto.domain.aiCheckOutfit.service;

import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.AICheckOutfitClientRequestDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.PythonRequestClothesListItems;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.response.AICheckOutfitClientResponseDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.repository.AICheckOutfitRepository;
import com.ssafy.moeutto.domain.clothes.repository.ClothesRepository;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.jwt.JwtTokenProvider;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AICheckOutfitServiceImpl implements AICheckOutfitService{

    private final AICheckOutfitRepository aiCheckOutfitRepository;
    private final ClothesRepository clothesRepository;
    private final AuthTokensGenerator authTokensGenerator;
    private final MemberRepository memberRepository;

    @Override
    public AICheckOutfitClientResponseDto checkOutfit(String token, AICheckOutfitClientRequestDto aiCheckOutfitClientRequestDto) throws BaseException {

        UUID memberId = authTokensGenerator.extractMemberId(token);

        // 사용자 정보 체크
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (!memberOptional.isPresent()) {
            throw new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER);
        }

        PythonRequestClothesListItems clothesItems = clothesRepository.find


        return null;
    }
}
