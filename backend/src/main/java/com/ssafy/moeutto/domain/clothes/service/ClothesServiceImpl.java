package com.ssafy.moeutto.domain.clothes.service;

import com.ssafy.moeutto.domain.clothes.dto.request.ClothesRegistRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.response.ClothesRegistResponseDto;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.domain.clothes.repository.ClothesRepository;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.domain.middleCategory.entity.MiddleCategory;
import com.ssafy.moeutto.domain.middleCategory.repository.MiddleCategoryRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClothesServiceImpl implements ClothesService {

    private final ClothesRepository clothesRepository;
    private final MemberRepository memberRepository;
    private final MiddleCategoryRepository middleCategoryRepository;

    /**
     * 옷 정보를 등록합니다.
     *
     * @param clothesRegistRequestDto
     * @return ClothesRegistResponseDto
     * @throws BaseException
     */
    @Override
    public ClothesRegistResponseDto registClothes(ClothesRegistRequestDto clothesRegistRequestDto) throws BaseException {
        Optional<MiddleCategory> middleCategoryOptional = middleCategoryRepository.findById(clothesRegistRequestDto.getMiddleCategoryId());

        // 중분류 카테고리 체크
        if (!middleCategoryOptional.isPresent()) {
            throw new BaseException(BaseResponseStatus.NOT_FOUND_MIDDLE_CATEGORY);
        }

        // 사용자 체크 ( 임시로 랜덤 )
        Optional<Member> memberOptional = memberRepository.findById(UUID.randomUUID());

        // 옷 정보 저장
        Clothes clothes = Clothes.builder()
                .member(memberOptional.get())
                .middleCategory(middleCategoryOptional.get())
                .name(clothesRegistRequestDto.getName())
                .season(clothesRegistRequestDto.getSeason())
                .color(clothesRegistRequestDto.getColor())
                .thickness(clothesRegistRequestDto.getThickness())
                .price(clothesRegistRequestDto.getPrice())
                .shop(clothesRegistRequestDto.getShop())
                .textile(clothesRegistRequestDto.getTextile())
                .regDate(new Date(System.currentTimeMillis()))
                .recentDate(new Date(System.currentTimeMillis()))
                .build();

        Clothes newClothes = clothesRepository.save(clothes);

        // 저장된 옷 정보 체크
        Optional<Clothes> clothesOptional = clothesRepository.findById(newClothes.getId());
        if (!clothesOptional.isPresent()) {
            throw new BaseException(BaseResponseStatus.NOT_FOUND_CLOTHES);
        }

        // 옷 정보 반환
        ClothesRegistResponseDto clothesRegistResponseDto = ClothesRegistResponseDto.builder()
                .clothes(clothesOptional.get())
                .build();

        return clothesRegistResponseDto;
    }
}
