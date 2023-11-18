/* eslint-disable */
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

import styled from 'styled-components';
import Sidebar from './components/common/SideNav';
import MobileNav from './components/common/MobileNav';


const ContentContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  // margin-left: 250px; // nav bar fixed 되었는데 웹일때 사이드 바에 컨텐츠 가리지 않도록 설정하였는데 이제 모바일뷰 집중 하기때문에 주석처리
`;

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const isLoginUrl = location.pathname.includes('login'); // 처음 인덱스 페이지에서는 이하 기능을 수행하지 않도록 수정하였습니다
    const isRoot = location.pathname === '/';
    const isLogoutUrl = location.pathname.includes('logout');

    // if (!accessToken && !isLoginUrl && !isRoot && !isLogoutUrl) {
    if (false) {
      Swal.fire({
        icon: 'warning',
        title: "<h5 style='color:red'>로그인 필요!",
        html: `
        로그인을 먼저 진행해주세요!
        `,
        showCancelButton: false,
        confirmButtonText: '확인',
      });
      navigate('/login');
    }
  }, [navigate, location.pathname]);
  return (
    // w-16 md:w-32 lg:w-48 bg-red-200
    // 448px가 너비 최대
    <div className="App flex max-w-md mx-auto">
      <Sidebar path="" />
      {location.pathname === '/' || location.pathname === '/login' || location.pathname === '/tutorial' ? null : (
        <MobileNav />
      )}
      <ContentContainer>
        {/* // v6 outlet 은 // children과 같은 효과 */}
        <Outlet />
      </ContentContainer>
    </div>
  );
}

export default App;
