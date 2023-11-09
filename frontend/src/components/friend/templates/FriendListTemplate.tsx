import React, { Dispatch, SetStateAction } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import ProfileCard from '../molecules/ProfileCard';
import { FriendListType } from '../../../pages/FriendListPage';
import './style.css';

type FriendListTemplateProps = {
  friendList: FriendListType['friendList'];
  setValue: PropType; // PropType는 필요한 타입으로 대체해야 합니다.
};

const FriendListTemplate = ({ friendList, setValue }) => {
  return (
    <div>
      <div className="relative w-[80%] m-auto drop-shadow-md">
        <BiSearchAlt className="absolute top-[5px] left-3 changeColor " size="30" />
        <input
          type="text"
          id="search"
          placeholder="친구를 검색해보세요"
          className="border rounded-full w-full h-[40px]  py-1 ps-12 text-AppBody1 leading-[20px] align-middle"
          onChange={setValue}
        />
      </div>
      <div>Frined Lsit</div>
      {friendList
        ? friendList.map(item => {
            return (
              <ProfileCard
                key={item.email}
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
