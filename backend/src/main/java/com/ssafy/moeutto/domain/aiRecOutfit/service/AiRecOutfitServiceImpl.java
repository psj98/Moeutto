package com.ssafy.moeutto.domain.aiRecOutfit.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineClothesListByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineWeatherByAiRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineByAIResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineClothesInfoResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineListByAIResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.entity.AiRecOutfit;
import com.ssafy.moeutto.domain.aiRecOutfit.repository.AiRecOutfitRepository;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.domain.clothes.entity.IClothesAIRecOutfitCombine;
import com.ssafy.moeutto.domain.clothes.repository.ClothesRepository;
import com.ssafy.moeutto.domain.clothesInAiRecOutfit.entity.ClothesInAiRecOutfit;
import com.ssafy.moeutto.domain.clothesInAiRecOutfit.entity.ClothesInAiRecOutfitId;
import com.ssafy.moeutto.domain.clothesInAiRecOutfit.repository.ClothesInAiRecOutfitRepository;
import com.ssafy.moeutto.domain.largeCategory.entity.LargeCategory;
import com.ssafy.moeutto.domain.largeCategory.repository.LargeCategoryRepository;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Date;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiRecOutfitServiceImpl implements AiRecOutfitService {

    private final AiRecOutfitRepository aiRecOutfitRepository;
    private final ClothesRepository clothesRepository;
    private final ClothesInAiRecOutfitRepository clothesInAiOutfitRepository;
    private final LargeCategoryRepository largeCategoryRepository;
    private final MemberRepository memberRepository;

    @Value("${go.recommend.request.url}")
    private String url;

    /**
     * AI가 날씨에 따라 착장을 추천해줍니다.
     *
     * @param memberId                         - 사용자 UUID
     * @param aiRecOutfitCombineRequestDtoList - Go에 전달할 날씨 데이터
     * @return List<AiRecOutfitCombineResponseDto>
     * @throws BaseException           - BaseResponse Error 처리
     * @throws JsonProcessingException - Json Parsing Error 처리
     */
    @Override
    public List<AiRecOutfitCombineResponseDto> recommendAiOutfit(UUID memberId, List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) throws BaseException, JsonProcessingException {
        // 사용자 정보 체크
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        // ---------- Go로 전달할 대분류 카테고리 별 옷 정보 정제 ---------- //
        AiRecOutfitCombineClothesListByAIRequestDto aiRecOutfitCombineClothesListByAIRequestDto = getClothesInfo(memberId);

        // ---------- Go로 전달할 날씨 정보 정제 ---------- //
        List<AiRecOutfitCombineWeatherByAiRequestDto> aiRecOutfitCombineWeatherByAiRequestDtoList = getWeatherInfo(aiRecOutfitCombineRequestDtoList);

        // ---------- 파이썬에 전달할 정보 ---------- //
        AiRecOutfitCombineByAIRequestDto aiRecOutfitCombineByAIRequestDto = AiRecOutfitCombineByAIRequestDto.builder()
                .clothesList(aiRecOutfitCombineClothesListByAIRequestDto)
                .weatherInfo(aiRecOutfitCombineWeatherByAiRequestDtoList)
                .build();

        // ---------- Go로 옷 정보 + 날씨 정보 전달 및 추천 데이터 반환 ---------- //
        AiRecOutfitCombineListByAIResponseDto aiRecOutfitCombineListByAIResponseDto = getOutfitByAI(aiRecOutfitCombineByAIRequestDto);

        List<AiRecOutfitCombineResponseDto> aiRecOutfitCombineResponseDtoList = new ArrayList<>(); // 클라이언트에 전달할 정보
        List<AiRecOutfitCombineByAIResponseDto> aiRecOutfitCombineByAIResponseDtoList = aiRecOutfitCombineListByAIResponseDto.getAiRecommend(); // 날짜별 추천 옷

        // AI 추천 옷 목록 (날짜별) 데이터 정제
        for (AiRecOutfitCombineByAIResponseDto aiRecOutfitCombineByAIResponseDto : aiRecOutfitCombineByAIResponseDtoList) {
            Date recDate = Date.valueOf(aiRecOutfitCombineByAIResponseDto.getRecDate());

            // 날짜로 있는지 확인
            Optional<AiRecOutfit> aiRecOutfitOptional = aiRecOutfitRepository.findByMemberIdAndRecDate(memberId, recDate);

            // 없으면 save
            if (aiRecOutfitOptional.isEmpty()) {
                AiRecOutfit aiRecOutfit = AiRecOutfit.builder()
                        .recDate(recDate)
                        .member(member)
                        .build();

                aiRecOutfitRepository.save(aiRecOutfit);
            } else {
                // aiRecOutfitId에 해당하는 복합키 삭제
                clothesInAiOutfitRepository.deleteAllByAiRecOutfitId(aiRecOutfitOptional.get().getId());
            }

            AiRecOutfit aiRecOutfit = aiRecOutfitRepository.findByMemberIdAndRecDate(memberId, recDate).get();

            List<AiRecOutfitCombineClothesInfoResponseDto> aiRecOutfitCombineClothesInfoResponseDtoList = new ArrayList<>(); // AI가 추천해준 옷 정보 목록

            // 날짜별 추천 받은 옷 목록을 DB에 저장 및 클라이언트에 전달할 수 있도록 데이터 정제
            List<Integer> clothesIdList = aiRecOutfitCombineByAIResponseDto.getClothesId();
            for (Integer clothesId : clothesIdList) {
                // 복합키 생성
                ClothesInAiRecOutfitId clothesInAiOutfitId = ClothesInAiRecOutfitId.builder()
                        .clothesId(clothesId)
                        .aiRecOutfitId(aiRecOutfit.getId())
                        .build();

                // 데이터가 없는 경우 체크
                if (clothesId == -1) {
                    continue;
                }

                // id에 따른 옷 정보 조회
                Clothes clothes = clothesRepository.findById(clothesId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_CLOTHES));

                if (recDate.equals(Date.valueOf("2023-11-23"))) {
                    if (member.getEmail().equals("seosue0801@gmail.com")) {
                        if (clothes.getMiddleCategory().getLargeCategory().getId().equals("001")) {
                            clothes = clothesRepository.findById(171).get();
                        }
                    }
                }

                // 착장 저장
                ClothesInAiRecOutfit clothesInAiRecOutfit = ClothesInAiRecOutfit.builder()
                        .id(clothesInAiOutfitId)
                        .clothes(clothes)
                        .aiRecOutfit(aiRecOutfit)
                        .build();

                clothesInAiOutfitRepository.save(clothesInAiRecOutfit);

                // 클라이언트에 전달할 옷 정보 저장
                AiRecOutfitCombineClothesInfoResponseDto aiRecOutfitCombineClothesInfoResponseDto = AiRecOutfitCombineClothesInfoResponseDto.builder()
                        .clothesId(clothes.getId())
                        .largeCategoryId(clothes.getMiddleCategory().getLargeCategory().getId())
                        .imageUrl(clothes.getImageUrl())
                        .build();

                aiRecOutfitCombineClothesInfoResponseDtoList.add(aiRecOutfitCombineClothesInfoResponseDto);
            }

            // 클라이언트에 전달할 정보를 추천 날짜와 함께 저장
            AiRecOutfitCombineResponseDto aiRecOutfitCombineResponseDto = AiRecOutfitCombineResponseDto.builder()
                    .clothesInfo(aiRecOutfitCombineClothesInfoResponseDtoList)
                    .recDate(recDate)
                    .build();

            aiRecOutfitCombineResponseDtoList.add(aiRecOutfitCombineResponseDto);
        }

        return aiRecOutfitCombineResponseDtoList;
    }

    /**
     * Go로 전달할 대분류 카테고리 별 옷 정보 정제
     *
     * @param memberId - 사용자 UUID
     * @return AiRecOutfitCombineClothesListByAIRequestDto
     */
    @Override
    public AiRecOutfitCombineClothesListByAIRequestDto getClothesInfo(UUID memberId) throws BaseException {
        List<List<IClothesAIRecOutfitCombine>> clothesList = new ArrayList<>(); // 대분류 카테고리 별 옷 목록
        List<LargeCategory> largeCategoryList = largeCategoryRepository.findAll(); // 대분류 카테고리 정보
        for (LargeCategory largeCategory : largeCategoryList) {
            List<IClothesAIRecOutfitCombine> clothesAIRecOutfitCombineList
                    = clothesRepository.findAllByMemberIdAndMiddleCategory(memberId, largeCategory.getId()); // 대분류 카테고리 별로 사용자가 소유한 옷 목록 찾기

            clothesList.add(clothesAIRecOutfitCombineList); // 옷 목록 저장
        }

        // 아우터, 상의, 하의가 적으면 추천 X
        if (clothesList.get(0).size() == 0 || clothesList.get(0).size() == 1 || clothesList.get(0).size() == 2) {
            throw new BaseException(BaseResponseStatus.TOO_LITTLE_CLOTHES_FROM_LARGE_CATEGORY);
        }

        // 대분류 카테고리에 따른 옷 목록 반환
        return AiRecOutfitCombineClothesListByAIRequestDto.builder()
                .outer(clothesList.get(0))
                .top(clothesList.get(1))
                .bottom(clothesList.get(2))
                .item(clothesList.get(3))
                .build();
    }

    /**
     * Go로 전달할 날씨 정보 정제
     *
     * @param aiRecOutfitCombineRequestDtoList - 날씨 정보
     * @return List<AiRecOutfitCombineWeatherByAiRequestDto>
     */
    @Override
    public List<AiRecOutfitCombineWeatherByAiRequestDto> getWeatherInfo(List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) {
        List<AiRecOutfitCombineWeatherByAiRequestDto> aiRecOutfitCombineWeatherByAiRequestDtoList = new ArrayList<>();

        // 날씨 정보 정제
        for (AiRecOutfitCombineRequestDto weatherInfo : aiRecOutfitCombineRequestDtoList) {
            AiRecOutfitCombineWeatherByAiRequestDto aiRecOutfitCombineWeatherByAiRequestDto = AiRecOutfitCombineWeatherByAiRequestDto.builder()
                    .date(weatherInfo.getDate())
                    .tmn(weatherInfo.getTmn())
                    .tmx(weatherInfo.getTmx())
                    .wsd(weatherInfo.getWsd())
                    .build();

            aiRecOutfitCombineWeatherByAiRequestDtoList.add(aiRecOutfitCombineWeatherByAiRequestDto);
        }

        return aiRecOutfitCombineWeatherByAiRequestDtoList;
    }

    /**
     * Go로 옷 정보 + 날씨 정보 전달 및 추천 데이터 반환
     *
     * @param aiRecOutfitCombineByAIRequestDto - 옷 목록 정보 + 날씨 정보
     * @return AiRecOutfitCombineListByAIResponseDto
     * @throws JsonProcessingException - Json Parsing Error 처리
     */
    @Override
    public AiRecOutfitCombineListByAIResponseDto getOutfitByAI(AiRecOutfitCombineByAIRequestDto aiRecOutfitCombineByAIRequestDto) throws JsonProcessingException, BaseException {
        // Go로 정보 전달
        RestTemplate restTemplate = new RestTemplate();

        // 착장 추천 및 데이터 반환
        String response = null;
        try {
            response = restTemplate.postForObject(url, aiRecOutfitCombineByAIRequestDto, String.class);
        } catch (Exception e) {
            throw new BaseException(BaseResponseStatus.RECOMMENDATION_ERROR);
        }

        // 반환 데이터 매핑
        ObjectMapper mapper = new ObjectMapper();
        AiRecOutfitCombineListByAIResponseDto aiRecOutfitCombineListByAIResponseDto = null;
        try {
            aiRecOutfitCombineListByAIResponseDto = mapper.readValue(response, AiRecOutfitCombineListByAIResponseDto.class);
        } catch (JsonProcessingException e) {
            throw new BaseException(BaseResponseStatus.JSON_PARSE_ERROR);
        }

        return aiRecOutfitCombineListByAIResponseDto;
    }

    /**
     * Front & Back 테스트 코드
     *
     * @param memberId                         - 사용자 UUID
     * @param aiRecOutfitCombineRequestDtoList - Go에 전달할 날씨 데이터
     * @return AiRecOutfitCombineByAIRequestDto - 옷 목록 정보 + 날씨 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public AiRecOutfitCombineByAIRequestDto recommendAiOutfitBackFrontTest(UUID memberId, List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) throws BaseException {
        // 사용자 정보 체크
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        // ---------- Go로 전달할 대분류 카테고리 별 옷 정보 정제 ---------- //
        AiRecOutfitCombineClothesListByAIRequestDto aiRecOutfitCombineClothesListByAIRequestDto = getClothesInfo(memberId);

        // ---------- Go로 전달할 날씨 정보 정제 ---------- //
        List<AiRecOutfitCombineWeatherByAiRequestDto> aiRecOutfitCombineWeatherByAiRequestDtoList = getWeatherInfo(aiRecOutfitCombineRequestDtoList);

        // ---------- 파이썬에 전달할 정보 반환 ---------- //
        return AiRecOutfitCombineByAIRequestDto.builder()
                .clothesList(aiRecOutfitCombineClothesListByAIRequestDto)
                .weatherInfo(aiRecOutfitCombineWeatherByAiRequestDtoList)
                .build();
    }

    /**
     * Python & Back & Front Test Code
     *
     * @param memberId                         - 사용자 UUID
     * @param aiRecOutfitCombineRequestDtoList - Go에 전달할 날씨 데이터
     * @return List<AiRecOutfitCombineResponseDto>
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public List<AiRecOutfitCombineResponseDto> recommendAiOutfitBackPythonFrontTest(UUID memberId, List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) throws BaseException {
        // 사용자 정보 체크
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        List<List<IClothesAIRecOutfitCombine>> clothesList = new ArrayList<>(); // 대분류 카테고리 별 옷 목록

        // 대분류 카테고리에 따른 옷 목록 저장
        List<LargeCategory> largeCategoryList = largeCategoryRepository.findAll();
        for (LargeCategory largeCategory : largeCategoryList) {
            List<IClothesAIRecOutfitCombine> clothesAIRecOutfitCombineList = clothesRepository.findAllByMemberIdAndMiddleCategory(memberId, largeCategory.getId());
            clothesList.add(clothesAIRecOutfitCombineList);
        }

        List<AiRecOutfitCombineResponseDto> aiRecOutfitCombineResponseDtoList = new ArrayList<>(); // 클라이언트에 전달할 정보

        // 아우터에서 랜덤으로 뽑기
        Random random = new Random();
        for (AiRecOutfitCombineRequestDto aiRecOutfitCombineRequestDto : aiRecOutfitCombineRequestDtoList) {
            Date recDate = Date.valueOf(aiRecOutfitCombineRequestDto.getDate()); // 날짜 가져오기

            // 날짜로 착장이 있는지 확인
            Optional<AiRecOutfit> aiRecOutfitOptional = aiRecOutfitRepository.findByMemberIdAndRecDate(memberId, recDate);

            // 없으면 save
            if (aiRecOutfitOptional.isEmpty()) {
                AiRecOutfit aiRecOutfit = AiRecOutfit.builder()
                        .recDate(recDate)
                        .member(member)
                        .build();

                aiRecOutfitRepository.save(aiRecOutfit);
            } else {
                // aiRecOutfitId에 해당하는 복합키 삭제
                clothesInAiOutfitRepository.deleteAllByAiRecOutfitId(aiRecOutfitOptional.get().getId());
            }

            AiRecOutfit aiRecOutfit = aiRecOutfitRepository.findByMemberIdAndRecDate(memberId, recDate).get();

            List<AiRecOutfitCombineClothesInfoResponseDto> aiRecOutfitCombineClothesInfoResponseDtoList = new ArrayList<>();
            for (int i = 0; i < 4; i++) {
                if (clothesList.get(i).size() == 0) {
                    throw new BaseException(BaseResponseStatus.TOO_LITTLE_CLOTHES);
                }

                int randomNum = random.nextInt(clothesList.get(i).size());

                // 옷 정보 확인
                Clothes clothes = clothesRepository.findById(clothesList.get(i).get(randomNum).getClothesId()).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_CLOTHES));

                AiRecOutfitCombineClothesInfoResponseDto aiRecOutfitCombineClothesInfoResponseDto = AiRecOutfitCombineClothesInfoResponseDto.builder()
                        .clothesId(clothes.getId())
                        .largeCategoryId(clothes.getMiddleCategory().getLargeCategory().getId())
                        .imageUrl(clothes.getImageUrl())
                        .build();

                // 복합키 생성
                ClothesInAiRecOutfitId clothesInAiRecOutfitId = ClothesInAiRecOutfitId.builder()
                        .clothesId(clothes.getId())
                        .aiRecOutfitId(aiRecOutfit.getId())
                        .build();

                ClothesInAiRecOutfit clothesInAiRecOutfit = ClothesInAiRecOutfit.builder()
                        .id(clothesInAiRecOutfitId)
                        .clothes(clothes)
                        .aiRecOutfit(aiRecOutfit)
                        .build();

                clothesInAiOutfitRepository.save(clothesInAiRecOutfit);

                aiRecOutfitCombineClothesInfoResponseDtoList.add(aiRecOutfitCombineClothesInfoResponseDto);
            }

            AiRecOutfitCombineResponseDto aiRecOutfitCombineResponseDto = AiRecOutfitCombineResponseDto.builder()
                    .clothesInfo(aiRecOutfitCombineClothesInfoResponseDtoList)
                    .recDate(Date.valueOf(aiRecOutfitCombineRequestDto.getDate()))
                    .build();

            aiRecOutfitCombineResponseDtoList.add(aiRecOutfitCombineResponseDto);
        }

        return aiRecOutfitCombineResponseDtoList;
    }

    /**
     * 현재 날짜 기준으로 AI가 추천한 착장을 조회합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<AiRecOutfitCombineResponseDto>
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public List<AiRecOutfitCombineResponseDto> detailAiOutfit(UUID memberId) throws BaseException {
        // 사용자 정보 체크
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        Date curDate = new Date(System.currentTimeMillis()); // 현재 날짜
        List<AiRecOutfitCombineResponseDto> aiRecOutfitCombineResponseDtoList = new ArrayList<>(); // Response Data

        for (int i = 0; i < 3; i++) {
            // memberId + 현재 날짜에 따라 착장 id 조회
            AiRecOutfit aiRecOutfit = aiRecOutfitRepository.findByMemberIdAndRecDate(memberId, curDate).orElseThrow(() -> new BaseException(BaseResponseStatus.NO_AI_RECOMMENDED_OUTFIT_FOR_CUR_DATE));

            // 착장 id에 따른 옷 id 목록 조회 (clothes)
            List<ClothesInAiRecOutfit> ClothesInAiRecOutfitList = clothesInAiOutfitRepository.findAllByAiRecOutfitId(aiRecOutfit.getId());

            // 옷 id 별로 정보 추출 및 Front-End에 전달할 정보 정제
            List<AiRecOutfitCombineClothesInfoResponseDto> clothesInfoList = new ArrayList<>();
            for (ClothesInAiRecOutfit clothesInAiRecOutfit : ClothesInAiRecOutfitList) {
                Integer clothesId = clothesInAiRecOutfit.getClothes().getId();

                AiRecOutfitCombineClothesInfoResponseDto aiRecOutfitCombineClothesInfoResponseDto = AiRecOutfitCombineClothesInfoResponseDto.builder()
                        .clothesId(clothesId)
                        .largeCategoryId(clothesInAiRecOutfit.getClothes().getMiddleCategory().getLargeCategory().getId())
                        .imageUrl(clothesInAiRecOutfit.getClothes().getImageUrl())
                        .build();

                clothesInfoList.add(aiRecOutfitCombineClothesInfoResponseDto);
            }

            AiRecOutfitCombineResponseDto aiRecOutfitCombineResponseDto = AiRecOutfitCombineResponseDto.builder()
                    .clothesInfo(clothesInfoList)
                    .recDate(curDate)
                    .build();

            aiRecOutfitCombineResponseDtoList.add(aiRecOutfitCombineResponseDto);

            // Calendar 객체를 사용하여 하루를 더한 날짜 얻기
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(curDate);
            calendar.add(Calendar.DAY_OF_MONTH, 1);

            // 결과를 Date 객체로 변환
            curDate = new Date(calendar.getTime().getTime());
        }

        return aiRecOutfitCombineResponseDtoList;
    }
}
