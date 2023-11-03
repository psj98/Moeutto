import React from 'react';
import { FaBell } from 'react-icons/fa';
import styled from 'styled-components';
import Img from '../../assets/images/profile.jpg';

interface Props {
  imgUrl: string;
}

const Profile = styled.nav`
  .alarm {
    fill: yellow; // 종 메인 색 : 알람이 없으면 검은색 있으면 노랑색
    stroke: white; // 하얀색 테두리 색
    stroke-width: 40px; // 하얀색 테두리 두께 조절
    font-size: 30px;
  }
`;

const ProfileImage = ({ imgUrl }: Props) => {
  // Img 샘플이다. 나중에 image url 받아와서 넣어야함
  return (
    <Profile>
      <div className="ms-[100%]">
        <FaBell className="alarm" />
      </div>
      <img className="overflow-hidden object-cover rounded-full h-[76px] w-[76px] mb-4" src={Img} alt="user image" />
    </Profile>
  );
};

export default ProfileImage;
