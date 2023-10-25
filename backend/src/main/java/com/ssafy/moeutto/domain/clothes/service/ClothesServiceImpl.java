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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClothesServiceImpl implements ClothesService {

    private final ClothesRepository clothesRepository;
    private final MemberRepository memberRepository;
    private final MiddleCategoryRepository middleCategoryRepository;

    @Override
    public ClothesRegistResponseDto registClothes(ClothesRegistRequestDto clothesRegistRequestDto) throws BaseException {
        Optional<MiddleCategory> middleCategoryOptional = middleCategoryRepository.findById(clothesRegistRequestDto.getMiddleCategoryId());

        if (!middleCategoryOptional.isPresent()) {
            throw new BaseException(BaseResponseStatus.NOT_FOUND_MIDDLE_CATEGORY);
        }

        Optional<Member> memberOptional = memberRepository.findByName("test");

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

        ClothesRegistResponseDto clothesRegistResponseDto = ClothesRegistResponseDto.builder()
                .id(newClothes.getId())
                .member(newClothes.getMember())
                .middleCategory(newClothes.getMiddleCategory())
                .name(newClothes.getName())
                .season(newClothes.getSeason())
                .color(newClothes.getColor())
                .thickness(newClothes.getThickness())
                .price(newClothes.getPrice())
                .shop(newClothes.getShop())
                .textile(newClothes.getTextile())
                .frequency(newClothes.getFrequency())
                .star(newClothes.getStar())
                .regDate(newClothes.getRegDate())
                .recentDate(newClothes.getRecentDate())
                .build();

        return clothesRegistResponseDto;
    }
}
