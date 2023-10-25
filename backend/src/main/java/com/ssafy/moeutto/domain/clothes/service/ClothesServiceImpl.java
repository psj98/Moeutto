package com.ssafy.moeutto.domain.clothes.service;

import com.ssafy.moeutto.domain.clothes.repository.ClothesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClothesServiceImpl {

    private final ClothesRepository clothesRepository;
}
