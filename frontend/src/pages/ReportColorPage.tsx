import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
  const naviagte = useNavigate();

  const goMainPage = () => {
    naviagte('/main');
  };

  const [myAnalysisColor, setMyAnalysisColor] = useState([]);
  const [otherAnalysisColor, setOtherAnalysisColor] = useState([]);

  const [shortReportComment, setShortReportComment] = useState('');

  const analysisData: AnalysisData = { myAnalysisColor, otherAnalysisColor };

  const fetchData = async () => {
    const axiosInstance = authInstance({ ContentType: 'application/json' });
    const response = await axiosInstance.get('/clothes/analysis-color');

    if (response.data.code === 3002) {
      Swal.fire({
        icon: 'error',
        html: '옷을 먼저 등록해주세요',
        showCancelButton: false,
        confirmButtonText: '확인',
      });
      goMainPage();
    } else {
      setMyAnalysisColor(response.data.data.myAnalysisColor);
      setOtherAnalysisColor(response.data.data.userAnalysisColor);
      setShortReportComment(
        response.data.data.myAnalysisColor.length >= 7 ? '무지개 인간인가요?' : '무채색 인간인가요?'
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="myCloset">
      {/* 인트로 분석 문구 */}
      <IntroComment nickname={`${sessionStorage.getItem('nickname')}`} imageUrl="/images/report.png" />

      {/* 간단 분석 문구 */}
      <ShortReportComment
        imageDivClass="absolute top-[-30px] left-[0px]"
        imageUrl="/images/rainbow.png"
        imageClass="w-20 inline-block"
        mainTitle={shortReportComment}
      />

      <ClosetReportTemplate analysisData={analysisData} />
    </div>
  );
}

export default ReportColorPage;
