import * as React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom'; 
import Sidebar from './components/common/SideNav';

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 30px; // nav bar와 컨텐츠 사이의 간격
  padding-top: 10px; // 컨텐츠와 상단 사이의 간격
  margin-left: 250px; // nav bar fixed 되었는데 컨텐츠 가리지 않도록
`;


function App() {
  return (
    <div className="App flex">
      <Sidebar path=""/>
      <ContentContainer>
        {/* // v6 outlet 은 // children과 같은 효과 */}
        <Outlet /> 
      </ContentContainer>

    </div>
  );
}

export default App;
