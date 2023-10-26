import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { BiHomeHeart, BiCloset, BiCalendar } from 'react-icons/bi';
import { MdPeopleAlt } from 'react-icons/md';
import { CgDetailsMore } from 'react-icons/cg';
// import { BiHomeHeart, BiCloset, MdPeopleAlt, BiCalendar, CgDetailsMore } from 'react-icons/all';
import ProfileImage from './Profile';

interface Props {
  children: any; // 컨텐츠 내용
  menuName?: string;
  path: string;
}

interface ContainerProps {
  focus: boolean;
}

// const ContentContainer = styled.div`
//   width: 100%;
//   height: 100%;
// `;

const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100vh;
  display: flex;
  &:hover {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.textColor};
  }
`;

const NavBar = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: 'pink-light'; */
  background: rgb(255, 235, 246);
  background: linear-gradient(
    180deg,
    rgba(255, 235, 246, 1) 0%,
    rgba(255, 235, 246, 1) 77%,
    rgba(255, 255, 255, 1) 100%
  );
`;

const Menu = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  li {
    width: 80%;
    height: 50px;
    padding: 10px 30px;
    display: flex;
    justify-content: start;
    align-items: center;
    text-align: left;
    vertical-align: middle;
    margin-top: 5px;
    color: grey;
    &:hover,
    &:focus,
    &:active {
      cursor: pointer;
      background-color: white;
      border-radius: 20px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      color: black;
    }
  }
`;

const menuList = [
  { menuName: '메인', path: '/main', icon: <BiHomeHeart /> },
  { menuName: '나의 옷장', path: '/mycloset', icon: <BiCloset /> },
  { menuName: '옷장 구경', path: '/notmycloset', icon: <MdPeopleAlt /> },
  { menuName: '캘린더', path: '/calendar', icon: <BiCalendar /> },
  { menuName: '더보기', path: '/mypage', icon: <CgDetailsMore /> },
];

const Sidebar = ({ path }: Props) => {
  const { pathname } = useLocation();

  const focus = pathname === path;

  return (
    <Container focus={focus}>
      <NavBar>
        <ProfileImage imgUrl="sample" />
        <Menu>
          {menuList.map(menu => (
            <li key={menu.menuName}>
              {menu.icon}
              <Link className="ps-9" to={menu.path}>
                {menu.menuName}
              </Link>
            </li>
          ))}
        </Menu>
      </NavBar>
    </Container>
  );
};

export default Sidebar;
