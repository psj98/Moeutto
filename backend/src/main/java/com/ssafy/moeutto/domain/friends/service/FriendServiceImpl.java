package com.ssafy.moeutto.domain.friends.service;


import com.ssafy.moeutto.domain.friends.dto.request.TestRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.TestResponseDto;
import com.ssafy.moeutto.domain.friends.entity.Following;
import com.ssafy.moeutto.domain.friends.entity.FollowingId;
import com.ssafy.moeutto.domain.friends.repository.FollowingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {


    private final FollowingRepository followingRepository;

    @Override
    public TestResponseDto testService(){



        Following test = Following.builder()
                        .followingId(new FollowingId(UUID.randomUUID(), UUID.randomUUID())).build();

        System.out.println(test.toString());

        followingRepository.save(test);

        TestResponseDto test1 = TestResponseDto.builder().following(test).build();

        System.out.println(test1.getFollowing().getFollowingId().getFollowingId().toString());
        System.out.println(test1.getFollowing().getFollowingId().getMyId().toString());
        System.out.println(test1.getFollowing().toString());
        System.out.println();


        return test1;
    }
}
