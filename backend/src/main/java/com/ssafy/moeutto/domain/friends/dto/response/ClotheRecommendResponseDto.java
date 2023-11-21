package com.ssafy.moeutto.domain.friends.dto.response;

import com.ssafy.moeutto.domain.friends.dto.request.ClothesRecommendListRequestDto;

import javax.validation.constraints.NotNull;
import java.util.List;

public class ClotheRecommendResponseDto {

    private Integer clothId;

    private String email;

    private String comment;

    private List<ClothesRecommendListRequestDto> clothesList;

}
