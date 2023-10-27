package com.ssafy.moeutto.domain.guestBook.repository;

import com.ssafy.moeutto.domain.guestBook.entity.GuestBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestBookRepository extends JpaRepository<GuestBook, Integer> {
}
