import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import MyCloset from './pages/MyCloset';
import Work from './pages/Work';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes> // v6부터 Switch가 Routes로 변경되었음
        <Route element={<App />}>
          <Route path="/" element={<Work />}/>
          <Route path="/main" element={<Work />}/>
          <Route path="/mycloset/*" element={<MyCloset />} /> // 여러 라우팅을 매칭하고 싶은 경우 *가 필요합니다
          {/* <Route path="/notmycloset" element={<NotMyCloset />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/mypage" element={<Mypage />} />  */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
