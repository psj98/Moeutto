package com.ssafy.moeutto.domain.aiRecOutfit.controller;

import com.ssafy.moeutto.domain.aiRecOutfit.service.AIRecOutfitService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai-rec-outfits")
@RequiredArgsConstructor
public class AIRecOutfitController {

    private final AIRecOutfitService aiRecOutfitService;
}
