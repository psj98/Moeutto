package com.ssafy.moeutto.domain.friends.service;

import com.ssafy.moeutto.domain.friends.dto.request.FollowRequestDto;
import com.ssafy.moeutto.domain.friends.dto.request.FriendsListRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.IFriendsListResponseDto;
import com.ssafy.moeutto.domain.friends.dto.response.IMyFriendsListResponseDto;
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

import java.util.List;
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
     *
     * @param memberId   : 내 아이디
     * @param requestDto : 팔로우 하려는 사람의 id
     * @throws BaseException
     */
    @Override
    public void follow(UUID memberId, FollowRequestDto requestDto) throws BaseException {

        /* 멤버 확인 */
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        Optional<Member> follow = memberRepository.findByEmail(requestDto.getEmail());

        UUID followingId = follow.get().getId();

        Following following = Following.builder()
                .followingId(new FollowingId(memberId, followingId)).build();

        Follower follower = Follower.builder()
                .followerId(new FollowerId(followingId, memberId)).build();

        /* 이미 팔로우 되어있는지 확인하기 */
        Optional<Follower> followerOptional = followerRepository.findById(follower.getFollowerId());
        Optional<Following> followingOptional = followingRepository.findById(following.getFollowingId());

        /* 이미 팔로우 되어있으면 취소 아니면 팔로우 */
        if (followerOptional.isPresent() || followingOptional.isPresent()) {
            followerRepository.deleteById(follower.getFollowerId());
            followingRepository.deleteById(following.getFollowingId());
        } else {
            followingRepository.save(following);
            followerRepository.save(follower);
        }

    }

    /**
     * 닉네임과 내 아이디 기반으로 검색
     *
     * @param memberId   : 내 아이디
     * @param requestDto : 친구 리스트 담는 dto
     * @return
     * @throws BaseException
     */

    @Override
    public List<IFriendsListResponseDto> searchFriends(UUID memberId, FriendsListRequestDto requestDto) throws BaseException {
        /* 멤버 체크 */
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        return memberRepository.findFriendsListByNickname(memberId, requestDto.getNickname());
    }

    /**
     * 내가 팔로우하는 친구들 목록 보기
     *
     * @param memberId
     * @return
     * @throws BaseException
     */
    @Override
    public List<IMyFriendsListResponseDto> searchMyFollowinglist(UUID memberId) throws BaseException {

        /* 멤버 체크 */
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        List<IMyFriendsListResponseDto> list = memberRepository.findMyFollowingListById(memberId);

        return list;
    }
}
