package com.ssafy.moeutto.domain.friendOutfit.service;

import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.domain.clothes.repository.ClothesRepository;
import com.ssafy.moeutto.domain.clothesInFriendOutfit.entity.ClothesInFriendOutfit;
import com.ssafy.moeutto.domain.clothesInFriendOutfit.entity.ClothesInFriendOutfitId;
import com.ssafy.moeutto.domain.clothesInFriendOutfit.repository.ClothesInFriendOutfitRepository;
import com.ssafy.moeutto.domain.friendOutfit.dto.request.FriendOutfitRecommendRequestDto;
import com.ssafy.moeutto.domain.friendOutfit.dto.response.FriendOutfitClothesResponseDto;
import com.ssafy.moeutto.domain.friendOutfit.dto.response.FriendOutfitListResponseDto;
import com.ssafy.moeutto.domain.friendOutfit.dto.response.FriendOutfitRecommendResponseDto;
import com.ssafy.moeutto.domain.friendOutfit.entity.FriendOutfit;
import com.ssafy.moeutto.domain.friendOutfit.repository.FriendOutfitRepository;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendOutfitServiceImpl implements FriendOutfitService {

    private final ClothesRepository clothesRepository;
    private final ClothesInFriendOutfitRepository clothesInFriendOutfitRepository;
    private final FriendOutfitRepository friendOutfitRepository;
    private final MemberRepository memberRepository;

    /**
     * 친구가 추천한 옷을 저장합니다.
     *
     * @param memberId                        - 사용자 id
     * @param friendOutfitRecommendRequestDto - 추천한 정보
     * @return FriendOutfitRecommendResponseDto - 추천 등록 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public FriendOutfitRecommendResponseDto recommendFriendOutfit(UUID memberId, FriendOutfitRecommendRequestDto friendOutfitRecommendRequestDto) throws BaseException {
        /* 추천한 친구 정보 체크 */
        Member recommender = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        /* 주인장 정보 체크 */
        String ownerEmail = friendOutfitRecommendRequestDto.getEmail();
        Member owner = memberRepository.findByEmail(ownerEmail).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        // 친구 착장 추천 정보 저장
        FriendOutfit friendOutfit = FriendOutfit.builder()
                .owner(owner)
                .recommender(recommender)
                .comment(friendOutfitRecommendRequestDto.getComment())
                .regDate(Timestamp.valueOf(LocalDateTime.now()))
                .build();

        FriendOutfit recommendFriendOutfit = friendOutfitRepository.save(friendOutfit);

        // 추천 옷 목록
        List<Integer> clothesList = friendOutfitRecommendRequestDto.getClothesList();

        for (Integer clothesId : clothesList) {
            // 옷 정보 체크
            Optional<Clothes> clothesOptional = clothesRepository.findById(clothesId);

            // 옷이 없으면 스킵
            if (clothesOptional.isEmpty()) {
                continue;
            }

            Clothes newClothes = clothesOptional.get(); // 옷 정보

            // 중개 테이블의 PK 생성
            ClothesInFriendOutfitId clothesInFriendOutfitId = ClothesInFriendOutfitId.builder()
                    .clothesId(newClothes.getId())
                    .friendOutfitId(recommendFriendOutfit.getId())
                    .build();

            // 친구 추천 id에 따른 옷 목록 저장
            ClothesInFriendOutfit clothesInFriendOutfit = ClothesInFriendOutfit.builder()
                    .id(clothesInFriendOutfitId)
                    .clothes(newClothes)
                    .friendOutfit(friendOutfit)
                    .build();

            clothesInFriendOutfitRepository.save(clothesInFriendOutfit);
        }

        List<ClothesInFriendOutfit> clothesInFriendOutfitList = clothesInFriendOutfitRepository.findAllByFriendOutfitId(recommendFriendOutfit.getId());

        // 값 반환
        return FriendOutfitRecommendResponseDto.builder()
                .friendOutfit(friendOutfit)
                .clothesInFriendOutfit(clothesInFriendOutfitList)
                .build();
    }

    /**
     * 추천한 옷 목록을 조회합니다.
     *
     * @param memberId - 사용자 id
     * @return List<FriendOutfitListResponseDto> - 추천 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public List<FriendOutfitListResponseDto> getFriendOutfitList(UUID memberId) throws BaseException {
        // 사용자 정보 체크
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        // 사용자 UUID로 추천 목록 조회
        List<FriendOutfit> friendOutfitList = friendOutfitRepository.findAllByOwnerIdOrderByRegDateDesc(memberId);

        List<FriendOutfitListResponseDto> friendOutfitListResponseDtoList = new ArrayList<>();

        for (FriendOutfit friendOutfit : friendOutfitList) {
            Integer friendOutfitId = friendOutfit.getId(); // 친구 추천 id

            List<FriendOutfitClothesResponseDto> clothesList = new ArrayList<>(); // 추천한 옷 목록 정보

            // 친구가 추천한 옷 목록 조회
            List<ClothesInFriendOutfit> clothesInFriendOutfitList = clothesInFriendOutfitRepository.findAllByFriendOutfitId(friendOutfitId);
            for (ClothesInFriendOutfit clothesInFriendOutfit : clothesInFriendOutfitList) {
                // 옷 정보 유무 체크
                Optional<Clothes> clothesOptional = clothesRepository.findById(clothesInFriendOutfit.getClothes().getId());

                // 없으면 스킵
                if (clothesOptional.isEmpty()) {
                    continue;
                }

                // 옷 목록 저장
                FriendOutfitClothesResponseDto friendOutfitClothesResponseDto = FriendOutfitClothesResponseDto.builder()
                        .id(clothesInFriendOutfit.getClothes().getId())
                        .image(clothesInFriendOutfit.getClothes().getImageUrl())
                        .build();

                clothesList.add(friendOutfitClothesResponseDto);
            }

            // 추천한 옷 목록을 List에 저장
            FriendOutfitListResponseDto friendOutfitListResponseDto = FriendOutfitListResponseDto.builder()
                    .clothesList(clothesList)
                    .recommenderNickname(friendOutfit.getRecommender().getNickname())
                    .regDate(Date.valueOf(friendOutfit.getRegDate().toLocalDateTime().toLocalDate()))
                    .build();

            friendOutfitListResponseDtoList.add(friendOutfitListResponseDto);
        }

        return friendOutfitListResponseDtoList;
    }
}
