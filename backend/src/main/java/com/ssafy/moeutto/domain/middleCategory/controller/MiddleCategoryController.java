package com.ssafy.moeutto.domain.middleCategory.controller;

import com.ssafy.moeutto.domain.middleCategory.service.MiddleCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/middle-categories")
@RequiredArgsConstructor
public class MiddleCategoryController {

    private final MiddleCategoryService middleCategoryService;
}
