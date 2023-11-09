import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

// redux
import { Provider } from 'react-redux';
// import store from './redux/store';

import './index.css';
import AddClothPage from './pages/AddClothPage';
import Work from './pages/Work';
import App from './App';

import MainPage from './pages/MainPage';
import AnalysisPage from './pages/AnalysisPage';
import PickPickPage from './pages/PickPickPage';
import ClothesDetailPage from './pages/ClothesDetailPage';
import MyClosetPage from './pages/MyClosetPage';

import MyClosetReport from './pages/MyClosetReportPage';
import ReportColorPage from './pages/ReportColorPage';
import ReportSeasonPage from './pages/ReportSeasonPage';
import ReportCostPage from './pages/ReportCostPage';
import ReportVolumePage from './pages/ReportVolumePage';
import ReportFrequencyPage from './pages/ReportFrequencyPage';

import MyPage from './pages/MyPage';

import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import LoginRedirectPage from './pages/LoginRedirectPage';

import CalendarPage from './pages/CalendarPage';
import CalendarPostPage from './pages/CalendarPostPage';

// import FrinedListPage from './pages/FriendListPage';

// import rootReducer from './redux/rootReducer';
import store from './redux/store';
import TutorialPage from './pages/TutorialPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          // v6부터 Switch가 Routes로 변경되었음
          <Route element={<App />}>
            <Route path="/" element={<Work />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/pickpick" element={<PickPickPage />} />
            <Route path="/mycloset/*" element={<AddClothPage />} /> // 여러 라우팅을 매칭하고 싶은 경우 *가 필요합니다
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login-redirect" element={<LoginRedirectPage />}></Route>
            <Route path="/tutorial" element={<TutorialPage />}></Route>
            <Route path="/mycloset" element={<MyClosetPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            {/* <Route path="/notmycloset" element={<NotMyCloset />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/mypage" element={<Mypage />} />  */}
            <Route path="/mycloset/detail/:id" element={<ClothesDetailPage />} /> // 라우팅 매칭 다시 해야됨 * 사용하기?
            <Route path="/mycloset/add-cloth" element={<AddClothPage />} />
            <Route path="/mycloset/report" element={<MyClosetReport />} />
            <Route path="/mycloset/report/color" element={<ReportColorPage />} />
            <Route path="/mycloset/report/season" element={<ReportSeasonPage />} />
            <Route path="/mycloset/report/costs" element={<ReportCostPage />} />
            <Route path="/mycloset/report/volume" element={<ReportVolumePage />} />
            <Route path="/mycloset/report/frequency" element={<ReportFrequencyPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/calendar/post" element={<CalendarPostPage />} />
            <Route path="*" element={<ErrorPage />} /> // 404 페이지 추가
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
