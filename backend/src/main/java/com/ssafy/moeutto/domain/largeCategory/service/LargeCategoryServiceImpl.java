package com.ssafy.moeutto.domain.largeCategory.service;

import com.ssafy.moeutto.domain.largeCategory.dto.response.LargeCategoryDetailResponseDto;
import com.ssafy.moeutto.domain.largeCategory.entity.LargeCategory;
import com.ssafy.moeutto.domain.largeCategory.repository.LargeCategoryRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LargeCategoryServiceImpl implements LargeCategoryService {

    private final LargeCategoryRepository largeCategoryRepository;

    /**
     * 대분류 카테고리 목록을 조회합니다.
     *
     * @return List<LargeCategoryDetailResponseDto> - 대분류 카테고리 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public List<LargeCategoryDetailResponseDto> getLargeCategoryList() throws BaseException {
        // 대분류 카테고리 목록 조회
        List<LargeCategory> largeCategoryList = largeCategoryRepository.findAll();

        // 크기가 0인 경우 체크
        if (largeCategoryList.size() == 0) {
            throw new BaseException(BaseResponseStatus.NOT_FOUND_LARGE_CATEGORY);
        }

        // 대분류 카테고리를 리스트로 저장 및 반환
        List<LargeCategoryDetailResponseDto> largeCategoryDetailResponseDtoList = new ArrayList<>();
        for (LargeCategory largeCategory : largeCategoryList) {
            LargeCategoryDetailResponseDto largeCategoryDetailResponseDto = LargeCategoryDetailResponseDto.builder()
                    .id(largeCategory.getId())
                    .name(largeCategory.getName())
                    .build();

            largeCategoryDetailResponseDtoList.add(largeCategoryDetailResponseDto);
        }

        return largeCategoryDetailResponseDtoList;
    }

    /**
     * 대분류 카테고리를 조회합니다.
     *
     * @param id - 대분류 카테고리 id
     * @return LargeCategoryDetailResponseDto - 대분류 카테고리 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public LargeCategoryDetailResponseDto getLargeCategoryDetail(String id) throws BaseException {
        // 대분류 카테고리 조회
        Optional<LargeCategory> largeCategoryOptional = largeCategoryRepository.findById(id);

        // 조회가 되지 않은 경우 체크
        if (largeCategoryOptional.isEmpty()) {
            throw new BaseException(BaseResponseStatus.NOT_FOUND_LARGE_CATEGORY);
        }

        LargeCategory largeCategory = largeCategoryOptional.get();

        // 대분류 카테고리 반환

        return LargeCategoryDetailResponseDto.builder()
                .id(largeCategory.getId())
                .name(largeCategory.getName())
                .build();
    }
}
