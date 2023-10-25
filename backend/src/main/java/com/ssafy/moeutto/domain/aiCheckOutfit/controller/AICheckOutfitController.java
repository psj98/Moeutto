package com.ssafy.moeutto.domain.aiCheckOutfit.controller;

import com.ssafy.moeutto.domain.aiCheckOutfit.service.AICheckOutfitService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai-check-outfits")
@RequiredArgsConstructor
public class AICheckOutfitController {

    private final AICheckOutfitService aiCheckOutfitService;
}
