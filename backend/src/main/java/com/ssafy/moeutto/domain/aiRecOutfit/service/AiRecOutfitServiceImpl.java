package com.ssafy.moeutto.domain.aiRecOutfit.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineClothesListByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineByAIResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineClothesInfoResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineListByAIResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.entity.AiRecOutfit;
import com.ssafy.moeutto.domain.aiRecOutfit.repository.AiRecOutfitRepository;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.domain.clothes.entity.IClothesAIRecOutfitCombine;
import com.ssafy.moeutto.domain.clothes.repository.ClothesRepository;
import com.ssafy.moeutto.domain.clothesInAiOutfit.entity.ClothesInAiRecOutfit;
import com.ssafy.moeutto.domain.clothesInAiOutfit.entity.ClothesInAiRecOutfitId;
import com.ssafy.moeutto.domain.clothesInAiOutfit.repository.ClothesInAiRecOutfitRepository;
import com.ssafy.moeutto.domain.largeCategory.entity.LargeCategory;
import com.ssafy.moeutto.domain.largeCategory.repository.LargeCategoryRepository;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    /**
     * AI가 날씨에 따라 착장을 추천해줍니다.
     *
     * @param memberId
     * @param aiRecOutfitCombineRequestDtoList
     * @return List<AiRecOutfitCombineResponseDto>
     * @throws BaseException
     * @throws JsonProcessingException
     */
    @Override
    public List<AiRecOutfitCombineResponseDto> recommendOutfit(UUID memberId, List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) throws BaseException, JsonProcessingException {
        // 사용자 정보 체크
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        ArrayList<List<IClothesAIRecOutfitCombine>> clothesList = new ArrayList<>(); // 대분류 카테고리 별 옷 목록

        // 파이썬으로 전달할 정보 정제
        List<LargeCategory> largeCategoryList = largeCategoryRepository.findAll();
        for (LargeCategory largeCategory : largeCategoryList) {
            List<IClothesAIRecOutfitCombine> clothesAIRecOutfitCombineList = clothesRepository.findAllByMemberIdAndMiddleCategory(memberId, largeCategory.getId());

            // 옷이 적은 경우 추천 불가 => ERROR
            if (clothesAIRecOutfitCombineList.size() == 0) {
                throw new BaseException(BaseResponseStatus.TOO_LITTLE_CLOTHES);
            }

            clothesList.add(clothesAIRecOutfitCombineList);
        }

        // 대분류 카테고리에 따라 값 저장
        AiRecOutfitCombineClothesListByAIRequestDto aiRecOutfitCombineClothesListByAIRequestDto = AiRecOutfitCombineClothesListByAIRequestDto.builder()
                .outer(clothesList.get(0))
                .top(clothesList.get(1))
                .bottom(clothesList.get(2))
                .item(clothesList.get(3))
                .build();

        // 파이썬에 전달할 정보
        AiRecOutfitCombineByAIRequestDto aiRecOutfitCombineByAIRequestDto = AiRecOutfitCombineByAIRequestDto.builder()
                .clothesList(aiRecOutfitCombineClothesListByAIRequestDto)
                .weatherInfo(aiRecOutfitCombineRequestDtoList)
                .build();

        // 파이썬으로 정보 전달
        String url = "http://localhost:9080/api/ml/ai-recommend"; // 파이썬 요청 url
        RestTemplate restTemplate = new RestTemplate();

        // AI가 착장 추천해주기 및 데이터 반환
        String response = restTemplate.postForObject(url, aiRecOutfitCombineByAIRequestDto, String.class);

        // AiRecOutfitCombineListByAIResponseDto로 매핑
        ObjectMapper mapper = new ObjectMapper();
        AiRecOutfitCombineListByAIResponseDto aiRecOutfitCombineListByAIResponseDto = mapper.readValue(response, AiRecOutfitCombineListByAIResponseDto.class);

        List<AiRecOutfitCombineResponseDto> aiRecOutfitCombineResponseDtoList = new ArrayList<>(); // 클라이언트에 전달할 정보
        List<AiRecOutfitCombineByAIResponseDto> aiRecOutfitCombineByAIResponseDtoList = aiRecOutfitCombineListByAIResponseDto.getAiRecOutfitCombineByAIResponseDtoList(); // 날짜별 추천 옷

        // AI 추천 옷 목록 (날짜별) 데이터 정제
        for (AiRecOutfitCombineByAIResponseDto aiRecOutfitCombineByAIResponseDto : aiRecOutfitCombineByAIResponseDtoList) {
            Date recDate = aiRecOutfitCombineByAIResponseDto.getRecDate();

            // 날짜로 있는지 확인
            Optional<AiRecOutfit> aiRecOutfitOptional = aiRecOutfitRepository.findByMemberIdAndRecDate(memberId, recDate);

            // 없으면 save
            if (!aiRecOutfitOptional.isPresent()) {
                AiRecOutfit aiRecOutfit = AiRecOutfit.builder()
                        .recDate(recDate)
                        .member(member)
                        .build();

                aiRecOutfitRepository.save(aiRecOutfit);
            }

            AiRecOutfit aiRecOutfit = aiRecOutfitRepository.findByMemberIdAndRecDate(memberId, recDate).get();

            // aiRecOutfitId에 해당하는 복합키 삭제
            clothesInAiOutfitRepository.deleteAllByAiRecOutfitId(aiRecOutfit.getId());

            List<AiRecOutfitCombineClothesInfoResponseDto> aiRecOutfitCombineClothesInfoResponseDtoList = new ArrayList<>(); // AI가 추천해준 옷 정보 목록

            // 날짜별 추천 받은 옷 목록을 DB에 저장 및 클라이언트에 전달할 수 있도록 데이터 정제
            List<Integer> clothesIdList = aiRecOutfitCombineByAIResponseDto.getClothesId();
            for (Integer clothesId : clothesIdList) {
                // 복합키 생성
                ClothesInAiRecOutfitId clothesInAiOutfitId = ClothesInAiRecOutfitId.builder()
                        .clothesId(clothesId)
                        .aiRecOutfitId(aiRecOutfit.getId())
                        .build();

                // id에 따른 옷 정보 조회
                Clothes clothes = clothesRepository.findById(clothesId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_CLOTHES));

                // 착장 저장
                ClothesInAiRecOutfit clothesInAiOutfit = ClothesInAiRecOutfit.builder()
                        .id(clothesInAiOutfitId)
                        .clothes(clothes)
                        .aiRecOutfit(aiRecOutfit)
                        .build();

                clothesInAiOutfitRepository.save(clothesInAiOutfit);

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
     * Front & Back 테스트 코드
     *
     * @param memberId
     * @param aiRecOutfitCombineRequestDtoList
     * @return AiRecOutfitCombineByAIRequestDto
     * @throws BaseException
     */
    @Override
    public AiRecOutfitCombineByAIRequestDto recommendOutfitBackFrontTest(UUID memberId, List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) throws BaseException {
        // 사용자 정보 체크
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        ArrayList<List<IClothesAIRecOutfitCombine>> clothesList = new ArrayList<>(); // 대분류 카테고리 별 옷 목록

        // 파이썬으로 전달할 정보 정제
        List<LargeCategory> largeCategoryList = largeCategoryRepository.findAll();
        for (LargeCategory largeCategory : largeCategoryList) {
            List<IClothesAIRecOutfitCombine> clothesAIRecOutfitCombineList = clothesRepository.findAllByMemberIdAndMiddleCategory(memberId, largeCategory.getId());
            clothesList.add(clothesAIRecOutfitCombineList);
        }

        // 대분류 카테고리에 따라 값 저장
        AiRecOutfitCombineClothesListByAIRequestDto aiRecOutfitCombineClothesListByAIRequestDto = AiRecOutfitCombineClothesListByAIRequestDto.builder()
                .outer(clothesList.get(0))
                .top(clothesList.get(1))
                .bottom(clothesList.get(2))
                .item(clothesList.get(3))
                .build();

        // 파이썬에 전달할 정보
        AiRecOutfitCombineByAIRequestDto aiRecOutfitCombineByAIRequestDto = AiRecOutfitCombineByAIRequestDto.builder()
                .clothesList(aiRecOutfitCombineClothesListByAIRequestDto)
                .weatherInfo(aiRecOutfitCombineRequestDtoList)
                .build();


        return aiRecOutfitCombineByAIRequestDto;
    }

    /**
     * Python & Back & Front Test Code
     *
     * @param memberId
     * @param aiRecOutfitCombineRequestDtoList
     * @return List<AiRecOutfitCombineResponseDto>
     * @throws BaseException
     */
    @Override
    public List<AiRecOutfitCombineResponseDto> recommendOutfitBackPythonFrontTest(UUID memberId, List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) throws BaseException {
        // 사용자 정보 체크
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        List<List<IClothesAIRecOutfitCombine>> clothesList = new ArrayList<>(); // 대분류 카테고리 별 옷 목록

        // 파이썬으로 전달할 정보 정제
        List<LargeCategory> largeCategoryList = largeCategoryRepository.findAll();
        for (LargeCategory largeCategory : largeCategoryList) {
            List<IClothesAIRecOutfitCombine> clothesAIRecOutfitCombineList = clothesRepository.findAllByMemberIdAndMiddleCategory(memberId, largeCategory.getId());
            clothesList.add(clothesAIRecOutfitCombineList);
        }

        // 아우터에서 랜덤으로 뽑기
        Random random = new Random();

        List<AiRecOutfitCombineResponseDto> aiRecOutfitCombineResponseDtoList = new ArrayList<>(); // 클라이언트에 전달할 정보

        for (AiRecOutfitCombineRequestDto aiRecOutfitCombineRequestDto : aiRecOutfitCombineRequestDtoList) {
            List<AiRecOutfitCombineClothesInfoResponseDto> aiRecOutfitCombineClothesInfoResponseDtoList = new ArrayList<>();

            for (int i = 0; i < 4; i++) {
                if (clothesList.get(i).size() == 0) {
                    throw new BaseException(BaseResponseStatus.TOO_LITTLE_CLOTHES);
                }

                int randomNum = random.nextInt(clothesList.get(i).size());

                Clothes clothes = clothesRepository.findById(clothesList.get(i).get(randomNum).getId()).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_CLOTHES));

                AiRecOutfitCombineClothesInfoResponseDto aiRecOutfitCombineClothesInfoResponseDto = AiRecOutfitCombineClothesInfoResponseDto.builder()
                        .clothesId(clothes.getId())
                        .largeCategoryId(clothes.getMiddleCategory().getLargeCategory().getId())
                        .imageUrl(clothes.getImageUrl())
                        .build();

                aiRecOutfitCombineClothesInfoResponseDtoList.add(aiRecOutfitCombineClothesInfoResponseDto);
            }

            AiRecOutfitCombineResponseDto aiRecOutfitCombineResponseDto = AiRecOutfitCombineResponseDto.builder()
                    .clothesInfo(aiRecOutfitCombineClothesInfoResponseDtoList)
                    .recDate(aiRecOutfitCombineRequestDto.getDate())
                    .build();

            aiRecOutfitCombineResponseDtoList.add(aiRecOutfitCombineResponseDto);
        }

        return aiRecOutfitCombineResponseDtoList;
    }
}
