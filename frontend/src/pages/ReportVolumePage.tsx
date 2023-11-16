// done
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

const ReportVolumePage = () => {
  const naviagte = useNavigate();

  const goMainPage = () => {
    naviagte('/main');
  };

  // 대분류 카테고리
  const largeCategory = {
    '002': '아우터',
    '001': '상의',
    '003': '하의',
    '011': '아이템',
  };

  const [halfDoughnutChartDataList, setHalfDoughnutChartDataList] = useState<object[]>([]); // 도넛 차트 데이터 리스트
  const [halfDoughnutChartData, setHalfDoughnutChartData] = useState([]); // 도넛 차트 데이터

  const [myAnalysisAmount, setMyAnalysisAmount] = useState([]);
  const [myTotalAmount, setMyTotalAmount] = useState(Number);
  const [userTotalAmountAvg, setUserTotalAmountAvg] = useState(Number);

  const [shortReportComment, setShortReportComment] = useState('');
  const [reportComment, setReportComment] = useState('');

  // 도넛 차트 데이터 정제
  useEffect(() => {
    setHalfDoughnutChartDataList(
      myAnalysisAmount?.map((row: HalfDoughnutChartDataItem) => ({
        categoryName: largeCategory[row.largeCategoryId],
        amount: row.amount,
        percent: Math.round((row.amount * 100) / myTotalAmount),
      }))
    );
  }, [myAnalysisAmount]);

  // 전달할 도넛 차트 데이터
  useEffect(() => {
    setHalfDoughnutChartData(halfDoughnutChartDataList);
  }, [halfDoughnutChartDataList]);

  const fetchData = async () => {
    const axiosInstance = authInstance({ ContentType: 'application/json' });
    const response = await axiosInstance.get('/clothes/analysis-amount');

    if (response.data.code === 3002) {
      Swal.fire({
        icon: 'error',
        html: '옷을 먼저 등록해주세요',
        showCancelButton: false,
        confirmButtonText: '확인',
      });
      goMainPage();
    } else {
      setMyTotalAmount(response.data.data.myTotalAmount);
      setUserTotalAmountAvg(response.data.data.userTotalAmountAvg);
      setMyAnalysisAmount(response.data.data.myAnalysisAmount);

      // 아래 삼항연산자는 추후 값을 조정해서
      setShortReportComment(
        response.data.data.myTotalAmount >= response.data.data.userTotalAmountAvg
          ? '집이 넓으신가요?'
          : '집에 도둑이 들었나요?'
      );
      setReportComment(
        response.data.data.myTotalAmount >= response.data.data.userTotalAmountAvg
          ? '당신은 맥시멀리스트입니다!'
          : '당신은 미니멀리스트입니다!'
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* 인트로 분석 문구 , 닉네임 받아야함*/}
      <IntroComment nickname={`${sessionStorage.getItem('nickname')}`} imageUrl="/images/report.png" />

      {/* 간단 분석 문구 */}
      <ShortReportComment
        imageDivClass="absolute top-[-30px] left-[0px]"
        imageUrl="/images/box.png"
        imageClass="w-16 inline-block"
        mainTitle={shortReportComment}
      />

      {/* 분석 문구 */}
      <div className="mb-10">
        <ReportComment
          divPadding="p-4"
          imageUrl="/images/report-closet.png"
          imageClass="w-16 inline-block"
          mainTitle="내 옷장에 몇 벌의 옷이 있을까요?"
          subTitle={reportComment}
        />
      </div>

      {/* 옷 개수 */}
      <ReportAvg
        image={{ url: '/images/hanger.png', alt: '옷걸이 이미지' }}
        myCloset={{ title: '나의 옷장', value: `${myTotalAmount}벌` }}
        avgCloset={{ title: '모으또 옷장 평균', value: `${userTotalAmountAvg}벌` }}
      />

      {/* 도넛 차트 */}
      {myTotalAmount !== 0 ? <HalfDoughnutChart halfDoughnutChartProp={halfDoughnutChartData} /> : <></>}
    </>
  );
};

export default ReportVolumePage;
