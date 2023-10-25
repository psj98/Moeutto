package com.ssafy.moeutto.domain.largeCategory.controller;

import com.ssafy.moeutto.domain.largeCategory.service.LargeCateogoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/large-categories")
@RequiredArgsConstructor
public class LargeCategoryController {

    private final LargeCateogoryService largeCateogoryService;
}
