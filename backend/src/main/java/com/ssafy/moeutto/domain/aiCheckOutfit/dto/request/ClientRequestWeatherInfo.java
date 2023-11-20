package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientRequestWeatherInfo {

    private int sky;
    
    private int pty;

    private double tmn;

    private double tmx;

    private double wsd;
}
