import { useEffect, useState } from 'react';

import { authInstance } from '../api/api';

import ClosetReportTemplate from '../components/report/templates/ClosetReportTemplate';
import { ColorAmountProp } from '../components/report/atoms/DonutChart';
import ShortReportComment from '../components/report/atoms/ShortReportComment';
import IntroComment from '../components/report/atoms/IntroComment';

export interface AnalysisData {
  myAnalysisColor: ColorAmountProp[];
  otherAnalysisColor: ColorAmountProp[];
}

function ReportColorPage() {
  const [myAnalysisColor, setMyAnalysisColor] = useState([]);
  const [otherAnalysisColor, setOtherAnalysisColor] = useState([]);

  const [shortReportComment, setShortReportComment] = useState('');

  const analysisData: AnalysisData = { myAnalysisColor, otherAnalysisColor };

  const fetchData = async () => {
    const axiosInstance = authInstance({ ContentType: 'application/json' });
    const response = await axiosInstance.get('/clothes/analysis-color');

    setMyAnalysisColor(response.data.data.myAnalysisColor);
    setOtherAnalysisColor(response.data.data.userAnalysisColor);
    setShortReportComment(myAnalysisColor.length >= 7 ? '무지개 인간인가요?' : '무채색 인간인가요?');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="myCloset">
      <div className="font-bold text-pink text-WebBody1">My Closet page</div>

      {/* 인트로 분석 문구 , 닉네임 받아야함*/}
      <IntroComment nickname={`${sessionStorage.getItem('nickname')}`} imageUrl="/images/report.png" />

      {/* 간단 분석 문구 */}
      <ShortReportComment
        imageDivClass="absolute top-[-35px] left-[0px]"
        imageUrl="/images/rainbow.png"
        imageClass="w-24 inline-block"
        mainTitle={shortReportComment}
      />

      <ClosetReportTemplate analysisData={analysisData} />
    </div>
  );
}

export default ReportColorPage;
