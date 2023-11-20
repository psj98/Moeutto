package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClientRequestClothesListDto {

    private int id;

    private String largeCategoryId;

    @Builder(toBuilder = true)
    public ClientRequestClothesListDto(int id, String largeCategoryId){
        this.id = id;
        this.largeCategoryId = largeCategoryId;
    }
}
