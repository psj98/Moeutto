import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BiHomeHeart, BiCloset, BiCalendar } from 'react-icons/bi';
import { MdPeopleAlt } from 'react-icons/md';
import { CgDetailsMore } from 'react-icons/cg';
// import { BiHomeHeart, BiCloset, MdPeopleAlt, BiCalendar, CgDetailsMore } from 'react-icons/all';
import ProfileImage from './Profile';
import { authInstance } from '../../api/api';

interface Props {
  menuName?: string;
  path: string;
}

interface ContainerProps {
  focus?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 250px;
  height: 100vh;
  position: fixed; // 메뉴 스크롤시 항상 보이도록
  &:hover {
    cursor: pointer;
  }
`;

const NavBar = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

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
    text-decoration: none;
    &.focused,
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

// 메뉴에 필요한 데이터 리스트를 생성
const menuList = [
  { menuName: '메인', path: '/main', icon: <BiHomeHeart /> },
  { menuName: '나의 옷장', path: '/mycloset', icon: <BiCloset /> },
  { menuName: '옷장 구경', path: '/notmycloset', icon: <MdPeopleAlt /> },
  { menuName: '캘린더', path: '/calendar', icon: <BiCalendar /> },
  { menuName: '더보기', path: '/mypage', icon: <CgDetailsMore /> },
  // { menuName: '로그아웃' },
];

const Sidebar = ({ path }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const axiosInstance = authInstance({ ContentType: 'application/x-www-form-urlencoded;charset=utf-8' });

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    axiosInstance.post('https://kauth.kakao.com/oauth/token', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('kakaoAccessToken')}`,
      },
    });

    navigate('/login');
  };

  return (
    <Container className="hidden">
      {' '}
      // 640px 까지 숨기기 //
      <NavBar>
        <ProfileImage imgUrl="sample" />
        <Menu>
          {menuList.map(menu => {
            if (menu.menuName === '로그아웃') {
              // Provide an onClick handler for logout
              return (
                <li key={menu.menuName} onClick={logout} className={pathname === menu.path ? 'focused' : ''}>
                  {menu.icon}
                  <span className="ps-9">{menu.menuName}</span>
                </li>
              );
            } else {
              // Regular link handling for other menu items
              return (
                <Link key={menu.menuName} to={menu.path}>
                  <li className={pathname === menu.path ? 'focused' : ''}>
                    {menu.icon}
                    <span className="ps-9">{menu.menuName}</span>
                  </li>
                </Link>
              );
            }
          })}
        </Menu>
      </NavBar>
    </Container>
  );
};

export default Sidebar;
