import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HiHome, HiCalendar } from 'react-icons/hi';
import { BiCloset } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';
import { RiSettings3Fill } from 'react-icons/ri';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const Menu = styled.div<{ h: number }>`
  display: flex;
  position: fixed;
  bottom: 0;
  max-width: 448px;
  width: 100vw;
  // height: 51px;
  justify-content: space-evenly;
  z-index: 1000;
  background: white;
  border-radius: 20px 20px 0 0;

  // 스크롤 효과 시작
  &.nav-up {
    bottom: 0px; // 바닥에서 위로 올라와야해서 (+)
    transition: 0.5s;
  }

  &.nav-down {
    bottom: ${props => (props.h ? `-${props.h}px` : '0px')}; // 바닥에서 더 내려가야해서 (-)
    transition: 0.5s; // 애니메이션으로 스르륵 내려가는 효과를 냅니다
  }

  .focused {
    color: black;
  }
`;

type IsScollingType = 'UP' | 'DOWN' | 'INIT';

// 참고: 모바일 컴포넌트는 mui 라이브러리로 작성되었습니다.
const MobileNav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isScrolling, setIsScrolling] = useState<IsScollingType>('INIT');
  const menuList = [
    { menuName: '메인', path: '/main', icon: <HiHome /> },
    { menuName: '나의옷장', path: '/mycloset', icon: <BiCloset /> },
    { menuName: '캘린더', path: '/calendar', icon: <HiCalendar /> },
    { menuName: '친구옷장', path: '/notmycloset/friend', icon: <BsPeopleFill /> },
    { menuName: '설정', path: '/mypage', icon: <RiSettings3Fill /> },
    // { menuName: '로그아웃' },
  ];

  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileNavNode = mobileNavRef.current;
  const mobileNavHeight: number = mobileNavRef != null && mobileNavNode?.clientHeight;

  useEffect(() => {
    const threshold = 0;
    let lastScrollY: number = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setIsScrolling(scrollY > lastScrollY ? 'DOWN' : 'UP');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    if (mobileNavNode) {
      switch (isScrolling) {
        case 'UP':
          mobileNavNode.classList.add('nav-up');
          mobileNavNode.classList.remove('nav-down');

          break;
        case 'DOWN':
          mobileNavNode.classList.remove('nav-up');
          mobileNavNode.classList.add('nav-down');

          break;
        default:
          mobileNavNode.classList.add('nav-basic');
          break;
      }
    }
  }, [isScrolling]);

  return (
    <Menu id="fixedNav" ref={mobileNavRef} h={mobileNavHeight} className="">
      {menuList.map(item => {
        return (
          <Button
            key={item.path}
            sx={{
              borderRadius: '55px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'text.disabled',
            }}
            className={pathname === item.path ? 'focused' : ''}
            onClick={() => navigate(item.path)}>
            {item.icon}
            <div>{item.menuName}</div>
          </Button>
        );
      })}
    </Menu>
  );
};

export default MobileNav;
