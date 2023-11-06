package com.ssafy.moeutto.test;

import com.ssafy.moeutto.domain.friends.entity.Follower;
import com.ssafy.moeutto.domain.friends.entity.FollowerId;
import com.ssafy.moeutto.domain.friends.repository.FollowerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test") // 테스트 환경을 위한 프로파일 설정
public class FollowerRepositoryTest {


    @Autowired
    private FollowerRepository followerRepository;

    @Test
    public void testFollowerPersistence() {
        // 테스트 데이터 생성
        UUID myId = UUID.randomUUID();
        UUID followerId = UUID.randomUUID();
        Follower follower = new Follower(new FollowerId(myId, followerId));


        // 데이터 저장
        followerRepository.save(follower);

        // 데이터 검색
        assertTrue(followerRepository.findById(new FollowerId(myId, followerId)).isPresent());

        // 데이터 삭제
        followerRepository.deleteById(new FollowerId(myId, followerId));
        assertFalse(followerRepository.findById(new FollowerId(myId, followerId)).isPresent());
    }
}
