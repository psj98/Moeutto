package com.ssafy.moeutto.domain.guestBook.service;

import com.ssafy.moeutto.domain.guestBook.dto.request.GuestBookRegistRequestDto;
import com.ssafy.moeutto.domain.guestBook.dto.response.GuestBookRegistResponseDto;
import com.ssafy.moeutto.domain.guestBook.entity.GuestBook;
import com.ssafy.moeutto.domain.guestBook.repository.GuestBookRepository;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GuestBookServiceImpl implements GuestBookService {

    private final MemberRepository memberRepository;
    private final GuestBookRepository guestBookRepository;

    /**
     * 방명록을 등록합니다.
     *
     * @param memberId
     * @param guestBookRegistRequestDto
     * @return GuestBookRegistResponseDto
     * @throws BaseException
     */
    @Override
    public GuestBookRegistResponseDto registGuestBook(UUID memberId, GuestBookRegistRequestDto guestBookRegistRequestDto) throws BaseException {
        Member owner = memberRepository.findByEmail(guestBookRegistRequestDto.getOwnerEmail()).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER)); // 방명록 주인 정보
        Member writer = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER)); // 작성자 정보

        // 저장할 GuestBook 생성
        GuestBook guestBook = GuestBook.builder()
                .owner(owner)
                .writer(writer)
                .post(guestBookRegistRequestDto.getPost())
                .regDate(new Date(System.currentTimeMillis()))
                .build();

        GuestBook newGuestBook = guestBookRepository.save(guestBook); // 방명록 저장

        // 반환할 방명록 (TEST용)
        GuestBookRegistResponseDto guestBookRegistResponseDto = GuestBookRegistResponseDto.builder()
                .guestBook(newGuestBook)
                .build();

        return guestBookRegistResponseDto;
    }
}
