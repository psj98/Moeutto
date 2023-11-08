import { useEffect, useState } from 'react';
import IntroComment from '../components/report/atoms/IntroComment';
import ShortReportComment from '../components/report/atoms/ShortReportComment';
import ReportComment from '../components/report/atoms/ReportComment';
import ReportAvg from '../components/report/atoms/ReportAvg';
import { authInstance } from '../api/api';

const ReportVolumePage = () => {
  const [myTotalAmount, setMyTotalAmount] = useState('');
  // const [myAnalysisAmount, setMyAnalysisAmount] = useState([]);
  const [userTotalAmountAvg, setUserTotalAmountAvg] = useState('');
  const [shortReportComment, setShortReportComment] = useState('');
  const [reportComment, setReportComment] = useState('');

  const fetchData = async () => {
    const axiosInstance = authInstance({ ContentType: 'application/json' });
    const response = await axiosInstance.get('/clothes/analysis-amount');

    console.log('지금 데이터 값은?', response);
    console.log('myTotalAmount : ', response.data.data.myTotalAmount);
    console.log('myAnalysisAmount : ', response.data.data.myAnalysisAmount);

    setMyTotalAmount(response.data.data.myTotalAmount);
    setUserTotalAmountAvg(response.data.data.userTotalAmountAvg);
    // setMyAnalysisAmount(response.data.data.myAnalysisAmount);
    // 아래 삼항연산자는 추후 값을 조정해서
    setShortReportComment(myTotalAmount >= userTotalAmountAvg ? '집이 넓으신가요?' : '집에 도둑이 들렀나요?');
    setReportComment(myTotalAmount >= userTotalAmountAvg ? '당신은 맥시멀리스트입니다!' : '당신은 미니멀리스트입니다!');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* 인트로 분석 문구 , 닉네임 받아야함*/}
      <IntroComment nickname="모드리치" imageUrl="/images/report.png" />

      {/* 간단 분석 문구 */}
      <ShortReportComment
        imageDivClass="absolute top-[-45px] left-[0px]"
        imageUrl="/images/box.png"
        imageClass="w-24 inline-block"
        mainTitle={shortReportComment}
      />

      {/* 분석 문구 */}
      <div className="mb-10">
        <ReportComment
          divPadding="p-4"
          imageUrl="/images/report-closet.png"
          imageClass="w-16 inline-block"
          mainTitle="내 옷장에는 몇 벌의 옷이 있을까요?"
          subTitle={reportComment}
        />
      </div>

      {/* 옷 개수 */}
      <ReportAvg
        image={{ url: '/images/hanger.png', alt: '옷걸이 이미지' }}
        myCloset={{ title: '나의 옷장', value: `${myTotalAmount}벌` }}
        avgCloset={{ title: '모으또 옷장 평균', value: `${userTotalAmountAvg}벌` }}
      />
    </>
  );
};

export default ReportVolumePage;
