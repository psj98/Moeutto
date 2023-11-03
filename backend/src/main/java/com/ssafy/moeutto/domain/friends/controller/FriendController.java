package com.ssafy.moeutto.domain.friends.controller;


import com.ssafy.moeutto.domain.friends.dto.request.TestRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.TestResponseDto;
import com.ssafy.moeutto.domain.friends.entity.Following;
import com.ssafy.moeutto.domain.friends.repository.FollowingRepository;
import com.ssafy.moeutto.domain.friends.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendsService;
    private final FollowingRepository followingRepository;

    @PostMapping("/test")
    public TestResponseDto test(){

        TestResponseDto responseDto = friendsService.testService();

        return responseDto;
    }

}
