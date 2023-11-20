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
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AICheckOutfitServiceImpl implements AICheckOutfitService {

    private final AiCheckOutfitRepository aiCheckOutfitRepository;
    private final ClothesInAiCheckOutfitRepsitory clothesInAiCheckOutfitRepsitory;
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

        // 리스트에 4개 초과로 들어올때
        if (arr.size() > 4) {
            throw new BaseException(BaseResponseStatus.OVER_FOUR_ITEMS_ERROR); // 6002 code
        }

        // 아이템을 총 4개 모두 고르지 않을때 처리
//        List<Character> check = new ArrayList<>(List.of('0', '0', '0', '0')); // 0 outer 1 top 2 bottom 3 item
        int[] check = new int[4];

        for (ClientRequestClothesListDto item : arr) {
            System.out.println(item.getId() + " " + item.getLargeCategoryId());
            if (item.getLargeCategoryId().equals("002")) {
                check[0]++;
            } else if (item.getLargeCategoryId().equals("001")) {
                check[1]++;
            } else if (item.getLargeCategoryId().equals("003")) {
                check[2]++;
            } else if (item.getLargeCategoryId().equals("011")) {
                check[3]++;
            }
        }

        System.out.println(Arrays.toString(check));

        // 상하의가 없을때
        if (check[1] == 0 || check[2] == 0) {
            throw new BaseException(BaseResponseStatus.NO_TOP_OR_BOTTOM_CLOTHES);
        }

        // 중복 카테고리 체크
        if (check[0] >= 2 || check[1] >= 2 || check[2] >= 2 || check[3] >= 2) {
            System.out.println("중복 오류");
            throw new BaseException(BaseResponseStatus.DUPLICATED_LARGE_CATEGORY);
        }

        // 아우터나 아이템중 선택안된 값에 default 값 채워주기 위함
        PythonRequestClothesListItems tempRequestItems = PythonRequestClothesListItems.builder()
                .clothesId(-1)  // 이거 기준으로 빈 값인지 판단
                .largeCategoryId("001")
                .clothesName("")
                .season("")
                .color("multi") // 팔레트에 없는값 넣으면 파이썬에서 에러뜨게했다고함
                .thickness(0)
                .textile("")
                .frequency(0)
                .build();

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

            if (requestItems.getLargeCategoryId().equals("002")) {
                outerTemp = requestItems;
            } else if (requestItems.getLargeCategoryId().equals("001")) {
                topTemp = requestItems;
            } else if (requestItems.getLargeCategoryId().equals("003")) {
                bottomTemp = requestItems;
            } else {
                itemTemp = requestItems;
            }
        }

        // 빈 카테고리 채워주기 ( 아우터, 아이템 ) check : 0 outer 3 item
        if (arr.size() < 4) {
            if (check[0] == 0) outerTemp = tempRequestItems;
            if (check[3] == 0) itemTemp = tempRequestItems;
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
                pythonResponse = responseEntity.getBody();
            }
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            e.printStackTrace();
        }

        // AICheckOutfitPythonResponseDto 로 매핑
        // ObjectMapper의 리플렉션을 이용하여 Json문자열로 부터 객체를 만드는 역직렬화 하여줌 ( 반대도 가능 )
        ObjectMapper mapper = new ObjectMapper();
        AICheckOutfitPythonResponseDto aiCheckOutfitPythonResponseDto;

        try {
            // 파이썬 서버로부터 반환된 데이터
            aiCheckOutfitPythonResponseDto = mapper.readValue(pythonResponse, AICheckOutfitPythonResponseDto.class);
        } catch (JsonProcessingException e) {
            throw new BaseException(BaseResponseStatus.JSON_PARSE_ERROR);
        }

        // Client로 Response보낼 Dto 준비
        List<ClientResponseClothesResult> clientClothesResult = new ArrayList<>();
        List<PythonResponseClothesResult> pythonClothesResult = aiCheckOutfitPythonResponseDto.getClothesResult();

        for (PythonResponseClothesResult pythonClothes : pythonClothesResult) {
            if (pythonClothes.getClothesId() != -1) {
                IAiCheckOutfitPythonResponseClothesResult tempClothesResult =
                        clothesRepository.findIdAndImageUrlAndLargeCategoryIdByClothesId(pythonClothes.getClothesId());

                ClientResponseClothesResult tempClientClothes = ClientResponseClothesResult.builder()
                        .clothesId(pythonClothes.getClothesId())
                        .largeCategoryId(tempClothesResult.getLargeCategoryId())
                        .imageUrl(tempClothesResult.getImageUrl())
                        .result(pythonClothes.getResult())
                        .fitnessNum(pythonClothes.getFitnessNum())
                        .build();

                clientClothesResult.add(tempClientClothes);
            } else {
                // 클라이언트로 부터 입력 안된 카테고리 (아우터, 아이템) 처리
                ClientResponseClothesResult tempClientClothes = ClientResponseClothesResult.builder()
                        .clothesId(-1)
                        .largeCategoryId("")
                        .imageUrl("https://moeutto-bucket.s3.ap-northeast-2.amazonaws.com/no_clothes.png")
                        .result("더 정확한 검사를 위해 선택해주세요.")
                        .fitnessNum(0)
                        .build();

                clientClothesResult.add(tempClientClothes);
            }
        }

        // DB에 저장할 데이터 ( ai_check_outfit , clothes_in_ai_check_outfit 테이블 ) 준비 및 save
        Date now = new Date(System.currentTimeMillis());

        // 사용자 정보 체크
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        AiCheckOutfit aiCheckOutfit = AiCheckOutfit.builder()
                .member(member)
                .regDate(now)
                .build();

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
        return AICheckOutfitClientResponseDto.builder()
                .id(ai_check_outfit_id)
                .regDate(now)
                .clothesResult(clientClothesResult)
                .clothesFeature(aiCheckOutfitPythonResponseDto.getClothesFeature())
                .weatherInfo(pythonRequestWeatherInfo)
                .build();
    }

    /**
     * 테스트용
     *
     * @param memberId
     * @param aiCheckOutfitClientRequestDto
     * @return
     * @throws BaseException
     */
    @Override
    public PythonRequestClothesList checkOutfitTest(UUID memberId, AICheckOutfitClientRequestDto aiCheckOutfitClientRequestDto) throws BaseException {
        // 사용자 체크
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        // 파이썬 서버로 보내기 위한 작업
        PythonRequestClothesListItems outerTemp = null;
        PythonRequestClothesListItems topTemp = null;
        PythonRequestClothesListItems bottomTemp = null;
        PythonRequestClothesListItems itemTemp = null;

        List<ClientRequestClothesListDto> arr = aiCheckOutfitClientRequestDto.getClothesList();

        // 리스트에 4개 초과로 들어올때
        if (arr.size() > 4) {
            throw new BaseException(BaseResponseStatus.OVER_FOUR_ITEMS_ERROR); // 6002 code
        }

        // 아이템을 총 4개 모두 고르지 않을때 처리
//        List<Integer> check = Arrays.asList(0, 0, 0, 0); // 0 outer 1 top 2 bottom 3 item
        int[] check = new int[4];

        for (ClientRequestClothesListDto item : arr) {
            if (item.getLargeCategoryId().equals("002")) {
                // 중복 카테고리 체크
                if (check[0] >= 1) throw new BaseException(BaseResponseStatus.DUPLICATED_LARGE_CATEGORY);
                check[0]++;
            } else if (item.getLargeCategoryId().equals("001")) {
                if (check[1] >= 1) throw new BaseException(BaseResponseStatus.DUPLICATED_LARGE_CATEGORY);
                check[1]++;
            } else if (item.getLargeCategoryId().equals("003")) {
                if (check[2] >= 1) throw new BaseException(BaseResponseStatus.DUPLICATED_LARGE_CATEGORY);
                check[2]++;
            } else if (item.getLargeCategoryId().equals("011")) {
                if (check[3] >= 1) throw new BaseException(BaseResponseStatus.DUPLICATED_LARGE_CATEGORY);
                check[3]++;
            }
        }

        // 상하의가 없을때
        if (check[1] != 1 || check[2] != 1) {
            throw new BaseException(BaseResponseStatus.NO_TOP_OR_BOTTOM_CLOTHES);
        }

        // 아우터나 아이템중 선택안된 값에 default 값 채워주기 위함
        PythonRequestClothesListItems tempRequestItems = PythonRequestClothesListItems.builder()
                .clothesId(-1)  // 이거 기준으로 빈 값인지 판단
                .largeCategoryId("001")
                .clothesName("")
                .season("")
                .color("")
                .thickness(0)
                .textile("")
                .frequency(0)
                .build();

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

            if (requestItems.getLargeCategoryId().equals("002")) {
                outerTemp = requestItems;
            } else if (requestItems.getLargeCategoryId().equals("001")) {
                topTemp = requestItems;
            } else if (requestItems.getLargeCategoryId().equals("003")) {
                bottomTemp = requestItems;
            } else {
                itemTemp = requestItems;
            }
        }

        // 빈 카테고리 채워주기 ( 아우터, 아이템 ) check : 0 outer 3 item
        if (check[0] == 0) outerTemp = tempRequestItems;
        if (check[3] == 0) itemTemp = tempRequestItems;

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

        return pythonRequestClothesLists;
    }
}
