package com.ssafy.moeutto.domain.guestBook.repository;

import com.ssafy.moeutto.domain.guestBook.entity.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface GuestBookRepository extends JpaRepository<GuestBook, Integer> {

    /**
     * 방명록 주인 id에 따른 글 목록을 조회합니다.
     * 
     * @param ownerId
     * @return
     */
    List<GuestBook> findAllByOwnerId(UUID ownerId);
}
