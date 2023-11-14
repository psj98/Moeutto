package com.ssafy.moeutto.domain.middleCategory.service;

import com.ssafy.moeutto.domain.middleCategory.dto.response.MiddleCategoryByLargeCategoryResponseDto;
import com.ssafy.moeutto.domain.middleCategory.dto.response.MiddleCategoryDetailResponseDto;
import com.ssafy.moeutto.domain.middleCategory.entity.MiddleCategory;
import com.ssafy.moeutto.domain.middleCategory.repository.MiddleCategoryRepository;
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
public class MiddleCategoryServiceImpl implements MiddleCategoryService {

    private final MiddleCategoryRepository middleCategoryRepository;

    /**
     * 중분류 카테고리 목록을 조회합니다.
     *
     * @return List<MiddleCategoryDetailResponseDto> - 중분류 카테고리 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public List<MiddleCategoryDetailResponseDto> getMiddleCategoryList() throws BaseException {
        List<MiddleCategory> middleCategoryList = middleCategoryRepository.findAll(); // 모든 중분류 카테고리 조회

        // 크기가 0인 경우 체크
        if (middleCategoryList.size() == 0) {
            throw new BaseException(BaseResponseStatus.NOT_FOUND_MIDDLE_CATEGORY);
        }

        // 조회한 값을 리스트에 저장 및 반환
        List<MiddleCategoryDetailResponseDto> middleCategoryDetailResponseDtoList = new ArrayList<>();
        for (MiddleCategory middleCategory : middleCategoryList) {
            MiddleCategoryDetailResponseDto middleCategoryDetailResponseDto = MiddleCategoryDetailResponseDto.builder()
                    .id(middleCategory.getId())
                    .name(middleCategory.getName())
                    .largeCategory(middleCategory.getLargeCategory())
                    .build();

            middleCategoryDetailResponseDtoList.add(middleCategoryDetailResponseDto);
        }

        return middleCategoryDetailResponseDtoList;
    }

    /**
     * 중분류 카테고리를 조회합니다.
     *
     * @param id - 중분류 카테고리 id
     * @return MiddleCategoryDetailResponseDto - 중분류 카테고리 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public MiddleCategoryDetailResponseDto getMiddleCategoryDetail(String id) throws BaseException {
        Optional<MiddleCategory> middleCategoryOptional = middleCategoryRepository.findById(id); // 중분류 카테고리 조회

        // 카테고리가 있는지 체크
        if (middleCategoryOptional.isEmpty()) {
            throw new BaseException(BaseResponseStatus.NOT_FOUND_MIDDLE_CATEGORY);
        }

        MiddleCategory middleCategory = middleCategoryOptional.get();

        // 중분류 카테고리 정보 반환
        return MiddleCategoryDetailResponseDto.builder()
                .id(middleCategory.getId())
                .name(middleCategory.getName())
                .largeCategory(middleCategory.getLargeCategory())
                .build();
    }

    /**
     * 대분류 카테고리에 해당하는 중분류 카테고리를 조회합니다.
     *
     * @param id - 대분류 카테고리 id
     * @return List<MiddleCategoryByLargeCategoryResponseDto>  - 대분류 카테고리에 해당하는 중분류 카테고리 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public List<MiddleCategoryByLargeCategoryResponseDto> getMiddleCategoryByLargeCategory(String id) throws BaseException {
        List<MiddleCategory> middleCategoryList = middleCategoryRepository.findByLargeCategoryId(id); // 대분류 카테고리에 해당하는 중분류 카테고리 목록 조회

        // 크기가 0인 경우 체크
        if (middleCategoryList.size() == 0) {
            throw new BaseException(BaseResponseStatus.NOT_FOUND_MIDDLE_CATEGORY_BY_LARGE_CATEGORY);
        }

        // 중분류 카테고리 목록 저장 및 반환
        List<MiddleCategoryByLargeCategoryResponseDto> middleCategoryByLargeCategoryResponseDtoList = new ArrayList<>();
        for (MiddleCategory middleCategory : middleCategoryList) {
            MiddleCategoryByLargeCategoryResponseDto middleCategoryByLargeCategoryResponseDto = MiddleCategoryByLargeCategoryResponseDto.builder()
                    .id(middleCategory.getId())
                    .name(middleCategory.getName())
                    .build();

            middleCategoryByLargeCategoryResponseDtoList.add(middleCategoryByLargeCategoryResponseDto);
        }

        return middleCategoryByLargeCategoryResponseDtoList;
    }
}
