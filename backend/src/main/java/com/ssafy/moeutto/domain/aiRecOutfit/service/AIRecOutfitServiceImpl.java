package com.ssafy.moeutto.domain.aiRecOutfit.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AIRecOutfitCombineByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AIRecOutfitCombineRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AIRecOutfitCombineByAIResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AIRecOutfitCombineResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.repository.AIRecOutfitRepository;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIRecOutfitServiceImpl implements AIRecOutfitService {

    private final AIRecOutfitRepository aiRecOutfitRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<AIRecOutfitCombineResponseDto> recommendOutfit(UUID memberId, List<AIRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) throws BaseException, JsonProcessingException {
        // 사용자 정보 체크
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        // 파이썬으로 정보 전달


        // 파이썬에서 Spring으로 데이터 받기
        String url = "http://localhost:9080/api/ml/ai-recommend"; // 파이썬 요청 url
        RestTemplate restTemplate = new RestTemplate();


        AIRecOutfitCombineByAIRequestDto aiRecOutfitCombineByAIRequestDto = AIRecOutfitCombineByAIRequestDto.builder()
                .weatherInfo(aiRecOutfitCombineRequestDtoList)
                .build();

        // AI가 착장 추천해주기 및 데이터 반환
        String response = restTemplate.postForObject(url, aiRecOutfitCombineByAIRequestDto, String.class);

        // DiaryCreateByAIResponseDto로 매핑
        ObjectMapper mapper = new ObjectMapper();
        AIRecOutfitCombineByAIResponseDto aiRecOutfitCombineByAIResponseDto = mapper.readValue(response, AIRecOutfitCombineByAIResponseDto.class);

        // 적합도 계산
        
        // DB에 save



        // 클라이언트에 전달

        return null;
    }
}
