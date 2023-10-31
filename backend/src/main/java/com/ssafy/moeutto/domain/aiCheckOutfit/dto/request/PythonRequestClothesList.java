package com.ssafy.moeutto.domain.aiCheckOutfit.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PythonRequestClothesList {

    List<PythonRequestClothesListItems> outer;
    List<PythonRequestClothesListItems> top;
    List<PythonRequestClothesListItems> bottom;
    List<PythonRequestClothesListItems> item;

}
