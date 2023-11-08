import React from 'react';
import ProfileCard from '../molecules/ProfileCard';
import { FriendListType } from '../../../pages/FriendListPage';

const FriendListTemplate = ({ friendList }: FriendListType) => {
  return (
    <div>
      <div>여기 검색박스 있어야함</div>
      <input type="text" id="search" placeholder="친구를 검색해보세요" />
      <div>Frined Lsit</div>
      {friendList
        ? friendList.map(item => {
            return (
              <ProfileCard
                nickname={item.nickname}
                email={item.email}
                profileImage={item.profileImage}
                isFollowing={item.isFollowing}
              />
            );
          })
        : null}
    </div>
  );
};

export default FriendListTemplate;
