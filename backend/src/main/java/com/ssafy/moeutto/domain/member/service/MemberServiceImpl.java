package com.ssafy.moeutto.domain.member.service;

import com.ssafy.moeutto.domain.aiCheckOutfit.entity.AiCheckOutfit;
import com.ssafy.moeutto.domain.aiCheckOutfit.repository.AiCheckOutfitRepository;
import com.ssafy.moeutto.domain.aiCheckOutfit.repository.ClothesInAiCheckOutfitRepository;
import com.ssafy.moeutto.domain.aiRecOutfit.entity.AiRecOutfit;
import com.ssafy.moeutto.domain.aiRecOutfit.repository.AiRecOutfitRepository;
import com.ssafy.moeutto.domain.calendar.repository.CalendarRepository;
import com.ssafy.moeutto.domain.clothes.repository.ClothesRepository;
import com.ssafy.moeutto.domain.clothesInAiRecOutfit.repository.ClothesInAiRecOutfitRepository;
import com.ssafy.moeutto.domain.friends.repository.FollowerRepository;
import com.ssafy.moeutto.domain.friends.repository.FollowingRepository;
import com.ssafy.moeutto.domain.guestBook.repository.GuestBookRepository;
import com.ssafy.moeutto.domain.member.dto.request.MemberUpdateMyInfoRequestDto;
import com.ssafy.moeutto.domain.member.dto.response.MemberMyPageResponseDto;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final ClothesInAiCheckOutfitRepository clothesInAiCheckOutfitRepository;
    private final ClothesInAiRecOutfitRepository clothesInAiRecOutfitRepository;
    private final AiCheckOutfitRepository aiCheckOutfitRepository;
    private final AiRecOutfitRepository aiRecOutfitRepository;
    private final GuestBookRepository guestBookRepository;
    private final CalendarRepository calendarRepository;
    private final ClothesRepository clothesRepository;
    private final FollowerRepository followerRepository;
    private final FollowingRepository followingRepository;

    /**
     * 솔이가 요청한 닉네임 검색 API 입니다.
     *
     * @param email - 사용자 이메일
     * @return String - 사용자 닉네임
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public String findNicknameForSol(String email) throws BaseException {
        Member friends = memberRepository.findByEmail(email).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        return friends.getNickname();
    }

    /**
     * 회원 정보를 조회합니다.
     *
     * @param memberId - 사용자 UUID
     * @return MemberMyPageResponseDto - 회원 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public MemberMyPageResponseDto giveMyPageInfo(UUID memberId) throws BaseException {
        // 사용자 정보 체크
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.CANT_GET_MEMBER_INFO));

        return MemberMyPageResponseDto.builder()
                .imageUrl(member.getProfileImage())
                .nickname(member.getNickname())
                .closetFind(member.isClosetFind())
                .accountFind(member.isAccountFind())
                .build();
    }

    /**
     * 회원 정보를 수정합니다.
     *
     * @param memberId                     - 사용자 UUID
     * @param memberUpdateMyInfoRequestDto - 갱신할 사용자 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public void updateMyPageInfo(UUID memberId, MemberUpdateMyInfoRequestDto memberUpdateMyInfoRequestDto) throws BaseException {
        if (memberUpdateMyInfoRequestDto.getNickname().length() > 8) {
            throw new BaseException(BaseResponseStatus.NICKNAME_OVER_LENGTH_EIGHT);
        }

        Member baseMember = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        Member fixMember = baseMember.toBuilder()
                .profileImage(memberUpdateMyInfoRequestDto.getImageUrl())
                .nickname(memberUpdateMyInfoRequestDto.getNickname())
                .accountFind(memberUpdateMyInfoRequestDto.isAccountFind())
                .closetFind(memberUpdateMyInfoRequestDto.isClosetFind())
                .build();

        memberRepository.save(fixMember);
    }

    /**
     * 회원 정보를 삭제합니다.
     *
     * @param memberId - 사용자 UUID
     * @throws BaseException - BaseResponse Error 처리
     */
    @Override
    public void deleteMember(UUID memberId) throws BaseException {
        // 사용자 정보 체크
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        // 착장 검사 제거
        log.debug("---------- 착장 검사 제거 시작 ----------");
        List<AiCheckOutfit> aiCheckOutfitList = aiCheckOutfitRepository.findByMemberId(memberId);

        // 착장 검사 옷 제거
        for (AiCheckOutfit aiCheckOutfit : aiCheckOutfitList) {
            clothesInAiCheckOutfitRepository.deleteAllByAiCheckOutfitId(aiCheckOutfit.getId());
            aiCheckOutfitRepository.deleteById(aiCheckOutfit.getId());
        }

        log.debug("---------- 착장 검사 제거 종료 ----------");

        // AI 추천 착장 옷 제거
        log.debug("---------- 착장 추천 제거 시작 ----------");

        List<AiRecOutfit> aiRecOutfitList = aiRecOutfitRepository.findByMemberId(memberId);

        // AI 추천 착장 제거
        for (AiRecOutfit aiRecOutfit : aiRecOutfitList) {
            clothesInAiRecOutfitRepository.deleteAllByAiRecOutfitId(aiRecOutfit.getId());
            aiRecOutfitRepository.deleteById(aiRecOutfit.getId());
        }

        log.debug("---------- 착장 추천 제거 종료 ----------");

        // 방명록 제거
        log.debug("---------- 방명록 제거 시작 ----------");

        guestBookRepository.deleteAllByWriterId(memberId);
        guestBookRepository.deleteAllByOwnerId(memberId);

        log.debug("---------- 방명록 제거 종료 ----------");

        calendarRepository.deleteAllByMemberId(memberId);

        // 팔로우, 팔로잉 제거
        log.debug("---------- 팔로우 제거 시작 ----------");

        followerRepository.deleteAllByFollowerId_MyId(memberId);

        log.debug("---------- 팔로우 제거 종료 ----------");

        log.debug("---------- 팔로잉 제거 시작 ----------");

        followingRepository.deleteAllByFollowingId_MyId(memberId);

        log.debug("---------- 팔로잉 제거 종료 ----------");

        // 옷 제거
        log.debug("---------- 옷 제거 시작 ----------");

        clothesRepository.deleteAllByMemberId(memberId);

        log.debug("---------- 옷 제거 종료 ----------");

        // 회원 제거
        log.debug("---------- 회원 제거 시작 ----------");

        memberRepository.deleteById(memberId);

        log.debug("---------- 회원 제거 종료 ----------");
    }
}
