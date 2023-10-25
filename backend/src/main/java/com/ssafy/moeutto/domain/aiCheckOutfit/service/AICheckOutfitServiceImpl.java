package com.ssafy.moeutto.domain.aiCheckOutfit.service;

import com.ssafy.moeutto.domain.aiCheckOutfit.repository.AICheckOutfitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AICheckOutfitServiceImpl {

    private final AICheckOutfitRepository aiCheckOutfitRepository;
}
