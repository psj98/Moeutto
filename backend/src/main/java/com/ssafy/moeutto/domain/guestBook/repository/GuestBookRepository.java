package com.ssafy.moeutto.domain.guestBook.repository;

import com.ssafy.moeutto.domain.guestBook.entity.GuestBook;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface GuestBookRepository extends JpaRepository<GuestBook, Integer> {

    /**
     * 방명록 주인 id에 따른 글 목록을 조회합니다.
     *
     * @param ownerId - 사용자 UUID (방명록 주인)
     * @return List<GuestBook> - 방명록 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    List<GuestBook> findAllByOwnerId(UUID ownerId) throws BaseException;

    /**
     * 작성자 id 기준으로 방명록을 삭제합니다.
     *
     * @param memberId - 사용자 UUID (작성자)
     * @throws BaseException - BaseResponse Error 처리
     */
    void deleteAllByWriterId(UUID memberId) throws BaseException;

    /**
     * 방명록 주인 id 기준으로 방명록을 삭제합니다.
     *
     * @param memberId - 사용자 UUID (방명록 주인)
     * @throws BaseException - BaseResponse Error 처리
     */
    void deleteAllByOwnerId(UUID memberId) throws BaseException;
}
