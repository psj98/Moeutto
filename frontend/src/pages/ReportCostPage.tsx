import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authInstance } from '../api/api';

import IntroComment from '../components/report/atoms/IntroComment';
import ShortReportComment from '../components/report/atoms/ShortReportComment';
import ReportComment from '../components/report/atoms/ReportComment';
import ReportAvg from '../components/report/atoms/ReportAvg';
import HalfDoughnutChart from '../components/report/atoms/HalfDoughnutChart';

interface HalfDoughnutChartDataItem {
  largeCategoryId: string;
  price: number;
  amount: number;
}

const ReportCostPage = () => {
  const naviagte = useNavigate();

  const goMainPage = () => {
    naviagte('/main');
  };

  // 대분류 카테고리
  const largeCategory = {
    '001': '아우터',
    '002': '상의',
    '003': '하의',
    '004': '아이템',
  };

  const [halfDoughnutChartDataList, setHalfDoughnutChartDataList] = useState<object[]>([]); // 도넛 차트 데이터 리스트
  const [halfDoughnutChartData, setHalfDoughnutChartData] = useState([]); // 도넛 차트 데이터

  const [myAnalysisCost, setMyAnalysisCost] = useState([]); // 내 옷장 분석 내용
  const [myTotalCost, setMyTotalCost] = useState<number>(); // 내 옷장 총 비용
  const [userTotalAvgCost, setUserTotalAvgCost] = useState(Number); // 사용자 옷장 평균 비용

  const [shortReportComment, setShortReportComment] = useState(''); // 간단 분석 문구
  const [reportComment, setReportComment] = useState(''); // 분석 문구

  // 도넛 차트 데이터 정제
  useEffect(() => {
    setHalfDoughnutChartDataList(
      myAnalysisCost?.map((row: HalfDoughnutChartDataItem) => ({
        categoryName: largeCategory[row.largeCategoryId],
        amount: row.price,
        percent: Math.round((row.price * 100) / myTotalCost),
      }))
    );
  }, [myAnalysisCost]);

  // 전달할 도넛 차트 데이터
  useEffect(() => {
    setHalfDoughnutChartData(halfDoughnutChartDataList);
  }, [halfDoughnutChartDataList]);

  const fetchData = async () => {
    const axiosInstance = authInstance({ ContentType: 'application/json' });
    const response = await axiosInstance
      .get('/clothes/analysis-cost')
      .then(res => {
        if (res.data.code === 3003) {
          goMainPage();
        } else {
          setMyAnalysisCost(res.data.data.myAnalysisCost); // 내 옷장 분석 내용
          setMyTotalCost(res.data.data.myTotalCost); // 내 옷장 총 비용 (만원 단위)
          setUserTotalAvgCost(Math.round(res.data.data.userTotalAvgCost / 10000)); // 사용자 옷장 평균 비용 (만원 단위)
        }

        return res;
      })
      .catch();

    const data = response.data.data;

    if (response.data.code === 3003) {
      Swal.fire({
        icon: 'error',
        html: '옷을 먼저 등록해주세요',
        showCancelButton: false,
        confirmButtonText: '확인',
      });
      goMainPage();
    } else {
      setHalfDoughnutChartData(halfDoughnutChartDataList);

      // 간단 분석 문구
      setShortReportComment(
        Math.round(data.myTotalCost / 10000) > Math.round(data.userTotalAvgCost / 10000)
          ? '지갑은 괜찮아요?'
          : '옷을 사는 건 어떨까요?'
      );

      // 분석 문구
      setReportComment(
        Math.round(data.myTotalCost / 10000) > Math.round(data.userTotalAvgCost / 10000)
          ? '당신의 옷장 가치는 높은 편입니다.\n안 입는 옷을 기부하는건 어떨까요?'
          : '당신의 옷장 가치는 낮은 편입니다.\n옷을 구매하는건 어떨까요?'
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* 인트로 분석 문구 */}
      <IntroComment nickname={`${sessionStorage.getItem('nickname')}`} imageUrl="/images/report.png" />

      {/* 간단 분석 문구 */}
      <ShortReportComment
        imageDivClass="absolute top-[-40px] left-[0px]"
        imageUrl="/images/wallet.png"
        imageClass="w-24 inline-block"
        mainTitle={shortReportComment}
      />

      {/* 분석 문구 */}
      <div className="mb-10">
        <ReportComment
          divPadding="p-4"
          imageUrl="/images/report-cost.png"
          imageClass="w-20 inline-block"
          mainTitle="내 옷장의 가치는 얼마일까?"
          subTitle={reportComment}
        />
      </div>

      {/* 옷장 가격 */}
      <ReportAvg
        image={{ url: '/images/money.png', alt: '돈 이미지' }}
        myCloset={{ title: '나의 옷장', value: `${Math.round(myTotalCost / 10000)}만원` }}
        avgCloset={{ title: '모으또 옷장 평균', value: `${userTotalAvgCost}만원` }}
      />

      {/* 도넛 차트 */}
      {myTotalCost === 0 ? <></> : <HalfDoughnutChart halfDoughnutChartProp={halfDoughnutChartData} />}
    </>
  );
};

export default ReportCostPage;
