import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/common/SideNav';
import MobileNav from './components/common/MobileNav';

const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 5px;
  // margin-left: 250px; // nav bar fixed 되었는데 웹일때 사이드 바에 컨텐츠 가리지 않도록 설정하였는데 이제 모바일뷰 집중 하기때문에 주석처리
`;

function App() {
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const isLoginUrl = location.pathname.includes('login');

    if (!accessToken && !isLoginUrl) {
      alert('로그인을 먼저 진행해주세요');
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  return (
    // w-16 md:w-32 lg:w-48 bg-red-200
    // 448px가 너비 최대
    <div className="App flex max-w-md mx-auto">
      <Sidebar path="" />
      {pathname === '/' || pathname === '/login' ? null : <MobileNav />}
      <ContentContainer>
        {/* // v6 outlet 은 // children과 같은 효과 */}
        <Outlet />
      </ContentContainer>
    </div>
  );
}

export default App;
