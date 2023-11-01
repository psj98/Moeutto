package com.ssafy.moeutto.domain.aiCheckOutfit.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.AICheckOutfitClientRequestDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.ClientRequestClothesListDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.PythonRequestClothesList;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.PythonRequestClothesListItems;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.response.AICheckOutfitClientResponseDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.response.AICheckOutfitPythonResponseDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.response.ClientResponseClothesResult;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.response.PythonResponseClothesResult;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.response.AICheckOutfitPythonResponseClothesResult;
import com.ssafy.moeutto.domain.aiCheckOutfit.repository.AICheckOutfitRepository;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.domain.clothes.repository.ClothesRepository;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
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

    @Value("${python.check.request.url}")
    private String checkRequestUrl;

    @Override
    public AICheckOutfitClientResponseDto checkOutfit(String token, AICheckOutfitClientRequestDto aiCheckOutfitClientRequestDto) throws BaseException {

        UUID memberId = authTokensGenerator.extractMemberId(token);

        // 사용자 정보 체크
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (!memberOptional.isPresent()) {
            throw new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER);
        }

        // 파이썬 서버로 보내기 위한 작업
        PythonRequestClothesListItems outerTemp = null;
        PythonRequestClothesListItems topTemp = null;
        PythonRequestClothesListItems bottomTemp = null;
        PythonRequestClothesListItems itemTemp = null;

        List<ClientRequestClothesListDto> arr = aiCheckOutfitClientRequestDto.getClothesList();

        for(int i=0;i<arr.size();i++){
            Clothes clothesInfo = clothesRepository.findByClothesId(arr.get(i).getId());

            System.out.println("AICheckOutfitService Impl , clothesInfo id : "+clothesInfo.getId());
            System.out.println("AICheckOutfitService Impl , arr.get(i).getId() : "+arr.get(i).getId());
            System.out.println("AICheckOutfitService Impl , arr.get(i).getLargeCateogryId() : "+arr.get(i).getLargeCategoryId());

            PythonRequestClothesListItems requestItems = PythonRequestClothesListItems.builder()
                    .largeCategoryId(arr.get(i).getLargeCategoryId())
                    .clothesId(arr.get(i).getId())
                    .season(clothesInfo.getSeason())
                    .color(clothesInfo.getColor())
                    .thickness(clothesInfo.getThickness())
                    .textile(clothesInfo.getTextile())
                    .frequency(clothesInfo.getFrequency())
                    .build();

            System.out.println("AICheckOutfitService Impl , requestItems : "+requestItems);

            if(requestItems.getLargeCategoryId().equals("001"))
                outerTemp = requestItems;
            else if(requestItems.getLargeCategoryId().equals("002"))
                topTemp = requestItems;
            else if(requestItems.getLargeCategoryId().equals("003"))
                bottomTemp = requestItems;
            else itemTemp = requestItems;

        }

        PythonRequestClothesList pythonRequestClothesLists = PythonRequestClothesList.builder()
                .outer(outerTemp)
                .top(topTemp)
                .bottom(bottomTemp)
                .item(itemTemp)
                .weatherInfo(aiCheckOutfitClientRequestDto.getWeatherInfo())
                .build();

        System.out.println(pythonRequestClothesLists);

        // 파이썬 서버로 전달
        RestTemplate restTemplate = new RestTemplate();

        // 파이썬 서버로부터 반환된 데이터
        String pythonResponse = restTemplate.postForObject(checkRequestUrl, pythonRequestClothesLists, String.class);

        // AICheckOutfitPythonResponseDto 로 매핑
        // ObjectMapper의 리플렉션을 이용하여 Json문자열로 부터 객체를 만드는 역직렬화 하여줌 ( 반대도 가능 )
        ObjectMapper mapper = new ObjectMapper();
        AICheckOutfitPythonResponseDto aiCheckOutfitPythonResponseDto;

        try {
            aiCheckOutfitPythonResponseDto =
                    mapper.readValue(pythonResponse, AICheckOutfitPythonResponseDto.class);
        } catch (JsonProcessingException e) {
            throw new BaseException(BaseResponseStatus.JSON_PARSE_ERROR);
        }

        // Client로 Response보낼 Dto 준비
        List<ClientResponseClothesResult> clientClothesResult = null;
        List<PythonResponseClothesResult> pythonClothesResult = aiCheckOutfitPythonResponseDto.getClothesResult();

        for(PythonResponseClothesResult pythonClothes : pythonClothesResult){

            AICheckOutfitPythonResponseClothesResult tempClothesResult =
                    clothesRepository.findIdAndImageUrlAndLargeCategoryIdByClothesId(pythonClothes.getClothesId());

            System.out.println("AICheckOutfitServiceImpl tempClothesResult : "+tempClothesResult);

            ClientResponseClothesResult tempClientClothes = ClientResponseClothesResult.builder()
                    .clothesId(pythonClothes.getClothesId())
                    .largeCategoryId(tempClothesResult.getLargeCategoryId())
                    .imageUrl(tempClothesResult.getImageUrl())
                    .result(pythonClothes.getResult())
                    .fitnessNum(pythonClothes.getFitnessNum())
                    .build();

            System.out.println("AICheckOutfitServiceImpl tempClientClothes : "+tempClientClothes);
            
            clientClothesResult.add(tempClientClothes);
        }

        // DB에 저장할 데이터
        
        
        // Client에게 보낼 Response
        DateTime now = DateTime.now();

        System.out.println("DateTime now() : "+now);

        AICheckOutfitClientResponseDto aiCheckOutfitClientResponseDto = AICheckOutfitClientResponseDto.builder()
                .id(1) // 임시, 착장 저장 후 찾아서 반환해야함
                .regDate(now)
                .clothesResult(clientClothesResult)
                .clothesFeature(aiCheckOutfitPythonResponseDto.getClothesFeature())
                .weatherInfo(aiCheckOutfitPythonResponseDto.getWeatherInfo())
                .build();

        System.out.println("AICheckOutfitServiceImpl aiCheckOutfitClientResponseDto : "+aiCheckOutfitClientResponseDto);

        return aiCheckOutfitClientResponseDto;
    }
}
