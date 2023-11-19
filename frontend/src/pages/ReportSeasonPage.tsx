import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { authInstance } from '../api/api';

import ClosetReportSeasonTemplate from '../components/report/templates/ClosetReportSeasonTemplate';

export interface CategoryAmountType {
  largeCategoryId: string;
  amount: number;
}

export interface SeasonClothesType {
  springClothes: CategoryAmountType[];
  summerClothes: CategoryAmountType[];
  autumnClothes: CategoryAmountType[];
  winterClothes: CategoryAmountType[];
}

export interface SeasonDataType {
  fourSeason: SeasonClothesType;
}

const ReportSeasonPage = () => {
  const naviagte = useNavigate();

  const goMainPage = () => {
    naviagte('/main');
  };

  const [seasonData, setSeasonData] = useState<SeasonClothesType | null>(null);
  
  // 데이터 가져오기
  const getSeasonData = async () => {
    try {
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.get('/clothes/analysis-season');

      if (response.data.code === 3002) {
        Swal.fire({
          icon: 'error',
          html: '옷을 먼저 등록해주세요',
          showCancelButton: false,
          confirmButtonText: '확인',
        });
        goMainPage();
      } else {
        setSeasonData(response.data.data);
      }
    } catch (error) {
      console.log('캘린더 목록 조회 실패', error);
    }
  };

  useEffect(() => {
    getSeasonData();
  }, []);

  return (
    <div>
      <ClosetReportSeasonTemplate fourSeason={seasonData} />
    </div>
  );
};

export default ReportSeasonPage;
