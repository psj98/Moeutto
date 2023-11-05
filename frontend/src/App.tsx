import * as React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom'; 
import Sidebar from './components/common/SideNav';
import MobileMenu from './components/common/Mobile';

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 30px;
  // margin-left: 250px; // nav bar fixed 되었는데 웹일때 사이드 바에 컨텐츠 가리지 않도록 설정하였는데 이제 모바일뷰 집중 하기때문에 주석처리
`;

function App() {
  return (
    // w-16 md:w-32 lg:w-48 bg-red-200
    // 448px가 너비 최대
    <div className="App flex max-w-md mx-auto border border-pink-hot rounded-xl">
      <Sidebar path="" />
      <MobileMenu />
      <ContentContainer>
        {/* // v6 outlet 은 // children과 같은 효과 */}
        <Outlet />
      </ContentContainer>
    </div>
  );
}

export default App;
