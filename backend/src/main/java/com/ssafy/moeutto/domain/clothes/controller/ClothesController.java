package com.ssafy.moeutto.domain.clothes.controller;

import com.ssafy.moeutto.domain.clothes.service.ClothesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/clothes")
@RequiredArgsConstructor
public class ClothesController {

    private final ClothesService clothesService;
}
