package com.ssafy.moeutto.domain.guestBook.service;

import com.ssafy.moeutto.domain.guestBook.repository.GuestBookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class GuestBookServiceImpl {

    private final GuestBookRepository guestBookRepository;
}
