import React, { useState, useEffect } from 'react';
import ClosetReportSeasonTemplate from '../components/report/templates/ClosetReportSeasonTemplate';
import { authInstance } from '../api/api';

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
  const [seasonData, setSeasonData] = useState<SeasonClothesType>();
  // 데이터 가져오기
  const getSeasonData = async () => {
    try {
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.get('/clothes/analysis-season');

      setSeasonData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log('캘린더 목록 조회 실패', error);
    }
  };

  useEffect(() => {
    getSeasonData();
  }, [seasonData]);

  return (
    <div>
      <ClosetReportSeasonTemplate fourSeason={seasonData} />{' '}
    </div>
  );
};

export default ReportSeasonPage;
