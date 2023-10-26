import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import MyCloset from './pages/MyCloset';
import Work from './pages/Work';
import Sidebar from './components/common/SideNav';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar path="/" children="" />
      <Routes>
        <Route path="/" element={<Work />} />
        <Route path="/main" element={<App children={''} />}>
          <Route index element={<Work />} />
        </Route>

        <Route path="/mycloset" element={<MyCloset />} />
        {/* <Route path="/notmycloset" element={<App />} />
        <Route path="/calendar" element={<App />} />
        <Route path="/mypage" element={<App />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
