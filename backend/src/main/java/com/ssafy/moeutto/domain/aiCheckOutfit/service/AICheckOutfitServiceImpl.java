package com.ssafy.moeutto.domain.aiCheckOutfit.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.AICheckOutfitClientRequestDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.ClientRequestClothesListDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.PythonRequestClothesList;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.PythonRequestClothesListItems;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.response.*;
import com.ssafy.moeutto.domain.aiCheckOutfit.entity.AiCheckOutfit;
import com.ssafy.moeutto.domain.aiCheckOutfit.entity.ClothesInAiCheckOutfit;
import com.ssafy.moeutto.domain.aiCheckOutfit.entity.IAiCheckOutfitPythonResponseClothesResult;
import com.ssafy.moeutto.domain.aiCheckOutfit.repository.AiCheckOutfitRepository;
import com.ssafy.moeutto.domain.aiCheckOutfit.repository.ClothesInAiCheckOutfitRepsitory;
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

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AICheckOutfitServiceImpl implements AICheckOutfitService{

    private final AiCheckOutfitRepository aiCheckOutfitRepository;
    private final ClothesInAiCheckOutfitRepsitory clothesInAiCheckOutfitRepsitory;
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

//            System.out.println("AICheckOutfitService Impl , clothesInfo id : "+clothesInfo.getId());
//            System.out.println("AICheckOutfitService Impl , arr.get(i).getId() : "+arr.get(i).getId());
//            System.out.println("AICheckOutfitService Impl , arr.get(i).getLargeCateogryId() : "+arr.get(i).getLargeCategoryId());

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

        /**
         * 여기 아래부턴 테스트 필요
         */
        
//        // 파이썬 서버로 전달
//        RestTemplate restTemplate = new RestTemplate();
//
//        // 파이썬 서버로부터 반환된 데이터
//        String pythonResponse = restTemplate.postForObject(checkRequestUrl, pythonRequestClothesLists, String.class);
//
//        // AICheckOutfitPythonResponseDto 로 매핑
//        // ObjectMapper의 리플렉션을 이용하여 Json문자열로 부터 객체를 만드는 역직렬화 하여줌 ( 반대도 가능 )
//        ObjectMapper mapper = new ObjectMapper();
//        AICheckOutfitPythonResponseDto aiCheckOutfitPythonResponseDto;
//
//        try {
//            aiCheckOutfitPythonResponseDto =
//                    mapper.readValue(pythonResponse, AICheckOutfitPythonResponseDto.class);
//        } catch (JsonProcessingException e) {
//            throw new BaseException(BaseResponseStatus.JSON_PARSE_ERROR);
//        }

        // AiCheckOutfitPythonResponseDto 임시 더미 데이터 Start ------
        List<PythonResponseClothesResult> tempPythonResponseClothesResult = new ArrayList<>();
        for(int i=1;i<=4;i++){
            PythonResponseClothesResult item = new PythonResponseClothesResult(i, "무난해요", 50);

            System.out.println(i+" 번째 : "+item);

            tempPythonResponseClothesResult.add(item);
        }

        ResponseClothesFeature tempClothesFeature = ResponseClothesFeature.builder()
                .temperature(5)
                .darkness(5)
                .seasonX(5)
                .seasonY(5)
                .build();

        System.out.println("tempClothesFeature : " + tempClothesFeature);

        ResponseWeatherInfo tempWeatherInfo = ResponseWeatherInfo.builder()
                .minTemperature(10)
                .maxTemperature(20)
                .weather(0)
                .build();

        System.out.println("tempWeatherInfo : "+tempWeatherInfo);

        AICheckOutfitPythonResponseDto aiCheckOutfitPythonResponseDto = AICheckOutfitPythonResponseDto.builder()
                .clothesResult(tempPythonResponseClothesResult)
                .clothesFeature(tempClothesFeature)
                .weatherInfo(tempWeatherInfo)
                .build();
        // AiCheckOutfitPythonResponseDto 임시 더미 데이터 End ------


        // Client로 Response보낼 Dto 준비
        List<ClientResponseClothesResult> clientClothesResult = new ArrayList<>();
        List<PythonResponseClothesResult> pythonClothesResult = aiCheckOutfitPythonResponseDto.getClothesResult();
            // clothes_ai_check_outfit 테이블을 위해서 선언
//        List<Integer> clothesIds = null;

        for(PythonResponseClothesResult pythonClothes : pythonClothesResult){

            IAiCheckOutfitPythonResponseClothesResult tempClothesResult =
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

//            clothesIds.add(pythonClothes.getClothesId());
            clientClothesResult.add(tempClientClothes);
        }

        // DB에 저장할 데이터 ( ai_check_outfit , clothes_in_ai_check_outfit 테이블 ) 준비 및 save
        Date now = new Date(System.currentTimeMillis());

        System.out.println("DateTime now() : "+now);

        /**
         * 이거 맞는건지 모르겠음.
         * AiCheckOutfit이랑 ClothesAiCheckOutfit entity에 조인 컬럼 되어있다고 다른 타입을 엔티티로 넣어줘도 되나?
         * 테스트 후에 안되거나 비효율 적이라 생각하면 바꿔야함
         */
        // ai_check_outfit 테이블에 저장
        Member member = memberRepository.findMemberById(memberId);
        
        AiCheckOutfit aiCheckOutfit = AiCheckOutfit.builder()
                .member(member)
                .regDate(now)
                .build();

        System.out.println("ai_check_outfit 테이블에 저장할 데이터 : "+ aiCheckOutfit);

            // 저장과 동시에 ai_check_outfit의 id 가져오기
        int ai_check_outfit_id = aiCheckOutfitRepository.save(aiCheckOutfit).getId();
            // clothes_in_ai_check_outfit entity에 넣어주기 위해 ai_check_outfit 다시 불러옴
        AiCheckOutfit recallAiCheckOutfit = aiCheckOutfitRepository.findAiCheckOutfitById(ai_check_outfit_id);

        // clothes_in_ai_check_outfit 테이블에 저장 ( 리스트라서 저장 방법 다르게 )
        for(ClientResponseClothesResult item : clientClothesResult){
            // 엔티티 양식때문에 clothes 불러옴
            Clothes recallClothes = clothesRepository.findByClothesId(item.getClothesId());

            ClothesInAiCheckOutfit clothesInAiCheckOutfit = ClothesInAiCheckOutfit.builder()
                    .clothes(recallClothes)
                    .aiCheckOutfit(recallAiCheckOutfit)
                    .result(item.getResult())
                    .fitnessNum(item.getFitnessNum())
                    .build();

            clothesInAiCheckOutfitRepsitory.save(clothesInAiCheckOutfit);
        }

        // Client에게 보낼 Response
        AICheckOutfitClientResponseDto aiCheckOutfitClientResponseDto = AICheckOutfitClientResponseDto.builder()
                .id(ai_check_outfit_id)
                .regDate(now)
                .clothesResult(clientClothesResult)
                .clothesFeature(aiCheckOutfitPythonResponseDto.getClothesFeature())
                .weatherInfo(aiCheckOutfitPythonResponseDto.getWeatherInfo())
                .build();

        System.out.println("AICheckOutfitServiceImpl aiCheckOutfitClientResponseDto : "+aiCheckOutfitClientResponseDto);

        return aiCheckOutfitClientResponseDto;
    }
}
