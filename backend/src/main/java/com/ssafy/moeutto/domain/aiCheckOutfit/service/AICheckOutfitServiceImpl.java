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
import com.ssafy.moeutto.domain.aiCheckOutfit.repository.ClothesInAiCheckOutfitRepository;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.domain.clothes.repository.ClothesRepository;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AICheckOutfitServiceImpl implements AICheckOutfitService {

    private final AiCheckOutfitRepository aiCheckOutfitRepository;
    private final ClothesInAiCheckOutfitRepository clothesInAiCheckOutfitRepsitory;
    private final ClothesRepository clothesRepository;
    private final MemberRepository memberRepository;

    // AI CHECK OUTFIT URL (Python URL)
    @Value("${python.check.request.url}")
    private String checkRequestUrl;

    @Override
    public AICheckOutfitClientResponseDto checkOutfit(UUID memberId, AICheckOutfitClientRequestDto aiCheckOutfitClientRequestDto) throws BaseException {
        // 사용자 체크
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        // 파이썬 서버로 보내기 위한 작업
        PythonRequestClothesListItems outerTemp = null;
        PythonRequestClothesListItems topTemp = null;
        PythonRequestClothesListItems bottomTemp = null;
        PythonRequestClothesListItems itemTemp = null;

        List<ClientRequestClothesListDto> arr = aiCheckOutfitClientRequestDto.getClothesList();

        for (int i = 0; i < arr.size(); i++) {
            Clothes clothesInfo = clothesRepository.findByClothesId(arr.get(i).getId());

            PythonRequestClothesListItems requestItems = PythonRequestClothesListItems.builder()
                    .largeCategoryId(arr.get(i).getLargeCategoryId())
                    .clothesId(arr.get(i).getId())
                    .clothesName(clothesInfo.getName())
                    .season(clothesInfo.getSeason())
                    .color(clothesInfo.getColor())
                    .thickness(clothesInfo.getThickness())
                    .textile(clothesInfo.getTextile())
                    .frequency(clothesInfo.getFrequency())
                    .build();

            System.out.println("AICheckOutfitService Impl , requestItems : " + requestItems);

            if (requestItems.getLargeCategoryId().equals("001")) {
                outerTemp = requestItems;
            } else if (requestItems.getLargeCategoryId().equals("002")) {
                topTemp = requestItems;
            } else if (requestItems.getLargeCategoryId().equals("003")) {
                bottomTemp = requestItems;
            } else {
                itemTemp = requestItems;
            }
        }

        ResponseWeatherInfo pythonRequestWeatherInfo = new ResponseWeatherInfo().toBuilder()
                .maxTemperature((int) (aiCheckOutfitClientRequestDto.getWeatherInfo().getTmx()))
                .minTemperature((int) (aiCheckOutfitClientRequestDto.getWeatherInfo().getTmn()))
                .weather(aiCheckOutfitClientRequestDto.getWeatherInfo().getPty())
                .build();

        PythonRequestClothesList pythonRequestClothesLists = PythonRequestClothesList.builder()
                .outer(outerTemp)
                .top(topTemp)
                .bottom(bottomTemp)
                .item(itemTemp)
                .weatherInfo(pythonRequestWeatherInfo)
                .build();

        System.out.println("파이썬에 보내는 정보 : " + pythonRequestClothesLists);

        /**
         * 여기 아래부턴 테스트 필요
         */

        // 파이썬 서버로 전달
        RestTemplate restTemplate = new RestTemplate();

        // UTF-8 설정
        List<HttpMessageConverter<?>> messageConverters = restTemplate.getMessageConverters();
        for (HttpMessageConverter<?> converter : messageConverters) {
            if (converter instanceof StringHttpMessageConverter) {
                ((StringHttpMessageConverter) converter).setDefaultCharset(StandardCharsets.UTF_8);
            }
        }

        // JSON 변환
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.set("Accept-Charset", StandardCharsets.UTF_8.name());

        // Convert your object to JSON string using a JSON converter (e.g., Jackson ObjectMapper)
        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody;
        try {
            requestBody = objectMapper.writeValueAsString(pythonRequestClothesLists);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            requestBody = ""; // Set an empty string or handle the error appropriately
        }

        // Create a request entity with headers and body
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        String pythonResponse = "";
        try {
            // Send the request and receive the response
            ResponseEntity<String> responseEntity = restTemplate.exchange(checkRequestUrl, HttpMethod.POST, requestEntity, String.class);

            // Check the response status code
            HttpStatus statusCode = responseEntity.getStatusCode();
            if (statusCode == HttpStatus.OK) {
                // If successful, retrieve the response body
                pythonResponse = responseEntity.getBody();
                // Handle the response data as needed
            } else {
                // Handle other status codes if needed
                System.out.println("Received status code: " + statusCode);
            }
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            // Handle HTTP error responses
            HttpStatus statusCode = e.getStatusCode();
            String responseBody = e.getResponseBodyAsString();
            System.out.println("Received status code: " + statusCode);
            System.out.println("Response body: " + responseBody);
            e.printStackTrace();
        }

        // 파이썬 서버로부터 반환된 데이터
//        String pythonResponse = restTemplate.postForObject(checkRequestUrl, pythonRequestClothesLists, String.class);

        // AICheckOutfitPythonResponseDto 로 매핑
        // ObjectMapper의 리플렉션을 이용하여 Json문자열로 부터 객체를 만드는 역직렬화 하여줌 ( 반대도 가능 )
        ObjectMapper mapper = new ObjectMapper();
        AICheckOutfitPythonResponseDto aiCheckOutfitPythonResponseDto;

        try {
            aiCheckOutfitPythonResponseDto =
                    mapper.readValue(pythonResponse, AICheckOutfitPythonResponseDto.class);

            System.out.println("AICHECKOUTFITSERVICE Python Response Dto : " + aiCheckOutfitPythonResponseDto);
        } catch (JsonProcessingException e) {
            throw new BaseException(BaseResponseStatus.JSON_PARSE_ERROR);
        }

        // AiCheckOutfitPythonResponseDto 임시 더미 데이터 Start ------
//        List<PythonResponseClothesResult> tempPythonResponseClothesResult = new ArrayList<>();
//        for (int i = 1; i <= 4; i++) {
//            PythonResponseClothesResult item = new PythonResponseClothesResult(i, "무난해요", 50);
//
//            System.out.println(i + " 번째 : " + item);
//
//            tempPythonResponseClothesResult.add(item);
//        }
//
//        ResponseClothesFeature tempClothesFeature = ResponseClothesFeature.builder()
//                .temperature(5)
//                .darkness(5)
//                .seasonX(5)
//                .seasonY(5)
//                .build();
//
//        System.out.println("tempClothesFeature : " + tempClothesFeature);
//
//        ResponseWeatherInfo tempWeatherInfo = ResponseWeatherInfo.builder()
//                .minTemperature(10)
//                .maxTemperature(20)
//                .weather(0)
//                .build();
//
//        System.out.println("tempWeatherInfo : " + tempWeatherInfo);
//
//        AICheckOutfitPythonResponseDto aiCheckOutfitPythonResponseDto = AICheckOutfitPythonResponseDto.builder()
//                .clothesResult(tempPythonResponseClothesResult)
//                .clothesFeature(tempClothesFeature)
//                .weatherInfo(tempWeatherInfo)
//                .build();
        // AiCheckOutfitPythonResponseDto 임시 더미 데이터 End ------


        // Client로 Response보낼 Dto 준비
        List<ClientResponseClothesResult> clientClothesResult = new ArrayList<>();
        List<PythonResponseClothesResult> pythonClothesResult = aiCheckOutfitPythonResponseDto.getClothesResult();
        // clothes_ai_check_outfit 테이블을 위해서 선언
//        List<Integer> clothesIds = null;

        for (PythonResponseClothesResult pythonClothes : pythonClothesResult) {

            IAiCheckOutfitPythonResponseClothesResult tempClothesResult =
                    clothesRepository.findIdAndImageUrlAndLargeCategoryIdByClothesId(pythonClothes.getClothesId());

            System.out.println("AICheckOutfitServiceImpl tempClothesResult : " + tempClothesResult);

            ClientResponseClothesResult tempClientClothes = ClientResponseClothesResult.builder()
                    .clothesId(pythonClothes.getClothesId())
                    .largeCategoryId(tempClothesResult.getLargeCategoryId())
                    .imageUrl(tempClothesResult.getImageUrl())
                    .result(pythonClothes.getResult())
                    .fitnessNum(pythonClothes.getFitnessNum())
                    .build();

            System.out.println("AICheckOutfitServiceImpl tempClientClothes : " + tempClientClothes);

//            clothesIds.add(pythonClothes.getClothesId());
            clientClothesResult.add(tempClientClothes);
        }

        // DB에 저장할 데이터 ( ai_check_outfit , clothes_in_ai_check_outfit 테이블 ) 준비 및 save
        Date now = new Date(System.currentTimeMillis());

        System.out.println("DateTime now() : " + now);

        /**
         * 이거 맞는건지 모르겠음.
         * AiCheckOutfit이랑 ClothesAiCheckOutfit entity에 조인 컬럼 되어있다고 다른 타입을 엔티티로 넣어줘도 되나?
         * 테스트 후에 안되거나 비효율 적이라 생각하면 바꿔야함
         */
        // ai_check_outfit 테이블에 저장

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        AiCheckOutfit aiCheckOutfit = AiCheckOutfit.builder()
                .member(member)
                .regDate(now)
                .build();

        System.out.println("ai_check_outfit 테이블에 저장할 데이터 : " + aiCheckOutfit);

        // 저장과 동시에 ai_check_outfit의 id 가져오기
        int ai_check_outfit_id = aiCheckOutfitRepository.save(aiCheckOutfit).getId();

        // clothes_in_ai_check_outfit entity에 넣어주기 위해 ai_check_outfit 다시 불러옴
        AiCheckOutfit recallAiCheckOutfit = aiCheckOutfitRepository.findAiCheckOutfitById(ai_check_outfit_id);

        // clothes_in_ai_check_outfit 테이블에 저장 ( 리스트라서 저장 방법 다르게 )
        for (ClientResponseClothesResult item : clientClothesResult) {
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
                .weatherInfo(pythonRequestWeatherInfo)
                .build();

        System.out.println("AICheckOutfitServiceImpl aiCheckOutfitClientResponseDto : " + aiCheckOutfitClientResponseDto);

        return aiCheckOutfitClientResponseDto;
    }
}
