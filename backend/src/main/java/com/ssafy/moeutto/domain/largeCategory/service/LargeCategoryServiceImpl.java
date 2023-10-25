package com.ssafy.moeutto.domain.largeCategory.service;

import com.ssafy.moeutto.domain.largeCategory.dto.response.LargeCategoryDetailResponseDto;
import com.ssafy.moeutto.domain.largeCategory.entity.LargeCategory;
import com.ssafy.moeutto.domain.largeCategory.repository.LargeCategoryRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class LargeCategoryServiceImpl implements LargeCategoryService {

    private final LargeCategoryRepository largeCategoryRepository;

    @Override
    public List<LargeCategoryDetailResponseDto> getLargeCategoryList() throws BaseException {
        List<LargeCategory> largeCategoryList = largeCategoryRepository.findAll();

        if (largeCategoryList.size() == 0) {
            throw new BaseException(BaseResponseStatus.NOT_FOUNT_LARGE_CATEGORY);
        }

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

    @Override
    public LargeCategoryDetailResponseDto getLargeCategoryDetail(String id) throws BaseException {
        Optional<LargeCategory> largeCategoryOptional = largeCategoryRepository.findById(id);
        if (!largeCategoryOptional.isPresent()) {
            throw new BaseException(BaseResponseStatus.NOT_FOUNT_LARGE_CATEGORY);
        }

        LargeCategory largeCategory = largeCategoryOptional.get();

        LargeCategoryDetailResponseDto largeCategoryDetailResponseDto = LargeCategoryDetailResponseDto.builder()
                .id(largeCategory.getId())
                .name(largeCategory.getName())
                .build();

        return largeCategoryDetailResponseDto;
    }
}
