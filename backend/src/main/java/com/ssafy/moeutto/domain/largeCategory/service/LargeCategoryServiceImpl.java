package com.ssafy.moeutto.domain.largeCategory.service;

import com.ssafy.moeutto.domain.largeCategory.repository.LargeCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class LargeCategoryServiceImpl {

    private final LargeCategoryRepository largeCategoryRepository;
}
