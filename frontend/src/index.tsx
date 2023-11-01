import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

// redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './redux/store';

import './index.css';
import AddClothPage from './pages/AddClothPage';
import Work from './pages/Work';
import App from './App';

import MainPage from './pages/MainPage';
import AnalysisPage from './pages/AnalysisPage';
import PickPickPage from './pages/PickPickPage';
import ClothesDetailPage from './pages/ClothesDetailPage';
import MyClosetListPage from './pages/MyClosetListPage';

import MyClosetReport from './pages/MyClosetReportPage';
import ReportColorPage from './pages/ReportColorPage';

import ErrorPage from './pages/ErrorPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const persistor = persistStore(store);
const queryClient = new QueryClient();

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              // v6부터 Switch가 Routes로 변경되었음
              <Route element={<App />}>
                <Route path="/" element={<Work />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/pickpick" element={<PickPickPage />} />
                <Route path="/mycloset/*" element={<AddClothPage />} /> // 여러 라우팅을 매칭하고 싶은 경우 *가
                필요합니다
                <Route path="/mycloset/list" element={<MyClosetListPage />} />
                <Route path="/analysis" element={<AnalysisPage />} />
                {/* <Route path="/notmycloset" element={<NotMyCloset />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/mypage" element={<Mypage />} />  */}
                <Route path="/mycloset/detail/:id" element={<ClothesDetailPage />} /> // 라우팅 매칭 다시 해야됨 *
                사용하기?
                <Route path="/mycloset/add-cloth" element={<AddClothPage />} />
                <Route path="/mycloset/report" element={<MyClosetReport />} />
                <Route path="/mycloset/report/color" element={<ReportColorPage />} />
                <Route path="*" element={<ErrorPage />} /> // 404 페이지 추가
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
