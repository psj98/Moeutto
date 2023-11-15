package com.ssafy.moeutto.domain.middleCategory.repository;

import com.ssafy.moeutto.domain.middleCategory.entity.MiddleCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MiddleCategoryRepository extends JpaRepository<MiddleCategory, String> {

    /**
     * 대분류 카테고리에 해당하는 중분류 카테고리 목록을 조회합니다.
     *
     * @param id - 대분류 카테고리 id
     * @return List<MiddleCategory> - 대분류 카테고리 id에 해당하는 중분류 카테고리 목록
     */
    List<MiddleCategory> findByLargeCategoryId(String id);
}
