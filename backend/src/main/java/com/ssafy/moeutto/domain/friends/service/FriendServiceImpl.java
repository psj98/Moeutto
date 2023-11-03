package com.ssafy.moeutto.domain.friends.service;


import com.ssafy.moeutto.domain.friends.dto.response.FollowRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.TestResponseDto;
import com.ssafy.moeutto.domain.friends.entity.Follower;
import com.ssafy.moeutto.domain.friends.entity.FollowerId;
import com.ssafy.moeutto.domain.friends.entity.Following;
import com.ssafy.moeutto.domain.friends.entity.FollowingId;
import com.ssafy.moeutto.domain.friends.repository.FollowerRepository;
import com.ssafy.moeutto.domain.friends.repository.FollowingRepository;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {


    private final FollowingRepository followingRepository;
    private final FollowerRepository followerRepository;

    private final MemberRepository memberRepository;


    /**
     * 팔로우 서비스 입니다.
     * @param memberId : 내 아이디
     * @param requestDto : 팔로우 하려는 사람의 id
     * @throws BaseException
     */
    @Override
    public void follow(UUID memberId, FollowRequestDto requestDto) throws BaseException {

        /* 멤버 확인 */
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        Member follow = memberRepository.findMemberByEmail(requestDto.getEmail());

        UUID followingId = follow.getId();

        Following following = Following.builder()
                        .followingId(new FollowingId(memberId, followingId)).build();

        Follower follower = Follower.builder()
                        .followerId(new FollowerId(followingId, memberId)).build();

        /* 이미 팔로우 되어있는지 확인하기 */
        Optional<Follower> followerOptional = followerRepository.findById(follower.getFollowerId());
        Optional<Following> followingOptional = followingRepository.findById(following.getFollowingId());

        /* 이미 팔로우 되어있으면 취소 아니면 팔로우 */
        if(followerOptional.isPresent() || followingOptional.isPresent()){
            followerRepository.deleteById(follower.getFollowerId());
            followingRepository.deleteById(following.getFollowingId());
        }else{
            followingRepository.save(following);
            followerRepository.save(follower);
        }






    }



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
