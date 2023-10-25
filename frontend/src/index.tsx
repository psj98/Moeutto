import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Work from './pages/Work';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Work />} />
        <Route path="/main" element={<App />} />
        <Route path="/mycloset" element={<App />} />
        <Route path="/notmycloset" element={<App />} />
        <Route path="/calendar" element={<App />} />
        <Route path="/mypage" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
