package com.ssafy.moeutto.domain.middleCategory.service;

import com.ssafy.moeutto.domain.middleCategory.repository.MiddleCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MiddleCategoryServiceImpl {

    private final MiddleCategoryRepository middleCategoryRepository;
}
