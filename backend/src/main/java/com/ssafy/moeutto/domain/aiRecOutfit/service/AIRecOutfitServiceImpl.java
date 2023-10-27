package com.ssafy.moeutto.domain.aiRecOutfit.service;

import com.ssafy.moeutto.domain.aiRecOutfit.repository.AIRecOutfitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIRecOutfitServiceImpl implements AIRecOutfitService {

    private final AIRecOutfitRepository aiRecOutfitRepository;
}
