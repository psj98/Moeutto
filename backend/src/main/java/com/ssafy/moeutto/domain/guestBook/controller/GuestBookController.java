package com.ssafy.moeutto.domain.guestBook.controller;

import com.ssafy.moeutto.domain.guestBook.service.GuestBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/guestbooks")
@RequiredArgsConstructor
public class GuestBookController {

    private final GuestBookService guestBookService;
}
