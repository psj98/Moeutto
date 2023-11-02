package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientRequestWeatherInfo {

    int sky;
    int pty;
    double tmn;
    double tmx;
    double wsd;

}
