package com.ssafy.moeutto.domain.aiRecOutfit.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineClothesListByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineByAIResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.repository.AiRecOutfitRepository;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.domain.clothes.entity.IClothesAIRecOutfitCombine;
import com.ssafy.moeutto.domain.clothes.repository.ClothesRepository;
import com.ssafy.moeutto.domain.largeCategory.entity.LargeCategory;
import com.ssafy.moeutto.domain.largeCategory.repository.LargeCategoryRepository;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiRecOutfitServiceImpl implements AiRecOutfitService {

    private final AiRecOutfitRepository aiRecOutfitRepository;
    private final ClothesRepository clothesRepository;
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
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

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

        // 파이썬으로 정보 전달
        String url = "http://localhost:9080/api/ml/ai-recommend"; // 파이썬 요청 url
        RestTemplate restTemplate = new RestTemplate();

        // AI가 착장 추천해주기 및 데이터 반환
        String response = restTemplate.postForObject(url, aiRecOutfitCombineByAIRequestDto, String.class);

        // DiaryCreateByAIResponseDto로 매핑
        ObjectMapper mapper = new ObjectMapper();
        AiRecOutfitCombineByAIResponseDto aiRecOutfitCombineByAIResponseDto = mapper.readValue(response, AiRecOutfitCombineByAIResponseDto.class);

        // 적합도 계산


        // DB에 save


        // 클라이언트에 전달
        List<AiRecOutfitCombineResponseDto> aiRecOutfitCombineResponseDtoList = new ArrayList<>(); // 클라이언트에 전달할 정보

        // 옷 id 별로 필요한 값 정제
        List<Integer> clothesId = aiRecOutfitCombineByAIResponseDto.getClothesId();
        for (Integer id : clothesId) {
            // id에 따라 옷 정보 조회
            Clothes clothes = clothesRepository.findById(id).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_CLOTHES));

            AiRecOutfitCombineResponseDto aiRecOutfitCombineResponseDto = AiRecOutfitCombineResponseDto.builder()
                    .clothesId(id)
                    .largeCategoryId(clothes.getMiddleCategory().getLargeCategory().getId())
                    .imageUrl(clothes.getImageUrl())
                    .recDate(aiRecOutfitCombineByAIResponseDto.getRecDate())
                    .build();

            aiRecOutfitCombineResponseDtoList.add(aiRecOutfitCombineResponseDto); // 정보를 리스트에 저장
        }

        return aiRecOutfitCombineResponseDtoList;
    }

    /**
     * Client & Back 테스트 코드
     *
     * @param memberId
     * @param aiRecOutfitCombineRequestDtoList
     * @return AiRecOutfitCombineByAIRequestDto
     * @throws BaseException
     */
    @Override
    public AiRecOutfitCombineByAIRequestDto recommendOutfitTest(UUID memberId, List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) throws BaseException {
        // 사용자 정보 체크
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        ArrayList<List<IClothesAIRecOutfitCombine>> clothesList = new ArrayList<>();

        // 파이썬으로 전달할 정보 정제
        List<LargeCategory> largeCategoryList = largeCategoryRepository.findAll();
        for (LargeCategory largeCategory : largeCategoryList) {
            List<IClothesAIRecOutfitCombine> clothesAIRecOutfitCombineList = clothesRepository.findAllByMemberIdAndMiddleCategory(memberId, largeCategory.getId());
            clothesList.add(clothesAIRecOutfitCombineList);
        }

        AiRecOutfitCombineClothesListByAIRequestDto aiRecOutfitCombineClothesListByAIRequestDto = AiRecOutfitCombineClothesListByAIRequestDto.builder()
                .outer(clothesList.get(0))
                .top(clothesList.get(1))
                .bottom(clothesList.get(2))
                .item(clothesList.get(3))
                .build();

        AiRecOutfitCombineByAIRequestDto aiRecOutfitCombineByAIRequestDto = AiRecOutfitCombineByAIRequestDto.builder()
                .clothesList(aiRecOutfitCombineClothesListByAIRequestDto)
                .weatherInfo(aiRecOutfitCombineRequestDtoList)
                .build();

        return aiRecOutfitCombineByAIRequestDto;
    }
}
