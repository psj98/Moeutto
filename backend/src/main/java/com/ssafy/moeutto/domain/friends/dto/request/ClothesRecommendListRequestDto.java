package com.ssafy.moeutto.domain.friends.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@NoArgsConstructor
public class ClothesRecommendListRequestDto {

    @NotNull
    private Integer clothId;
}

