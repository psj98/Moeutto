import { useEffect, useState } from 'react';

import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import { authInstance } from '../api/api';

import IntroComment from '../components/report/atoms/IntroComment';
import ShortReportComment from '../components/report/atoms/ShortReportComment';
import PieChartUsability from '../components/report/atoms/PieChartUsability';

const slideAnimation = keyframes`
    0% {
        transform: translateX(-100%);
    }s
    100% {
        transform: translateX(0);
    }
`;

const OuterContainer = styled.div`
  width: 300px;
  height: 30px;
  border-radius: 15px;
  background-color: #d6d6d6;
  position: relative;
  overflow: hidden;
`;

const InnerContainer = styled.div`
  height: 100%;
  border-radius: 15px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #ffbadb 0%, #fbe9ef 100%);
  animation: ${slideAnimation} 2s ease-in-out forwards;
`;

const ReportCostPage = () => {
  const [analysisAmountList, setAnalysisAmountList] = useState([]);
  const [minLargeCategoryName, setMinLargeCategoryName] = useState('');
  const [maxLargeCategoryName, setMaxLargeCategoryName] = useState('');
  const [barValue, setBarValue] = useState(Number);

  const [shortReportComment, setShortReportComment] = useState('');

  const fetchData = async () => {
    try {
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.get('/clothes/analysis-use');

      if (response.data.code === 2001) {
        Swal.fire({
          icon: 'question',
          html: '회원 정보가 없어요',
          showCancelButton: false,
          confirmButtonText: '확인',
        });
      }

      if (response.data.code === 2002) {
        Swal.fire({
          icon: 'warning',
          html: '세션이 만료되었습니다',
          showCancelButton: false,
          confirmButtonText: '확인',
        });
      }

      if (response.data.code === 5001) {
        Swal.fire({
          icon: 'error',
          html: '대분류 카테고리가 존재하지 않습니다.',
          showCancelButton: false,
          confirmButtonText: '확인',
        });
      }

      setAnalysisAmountList(response.data.data.analysisAmountList);

      setShortReportComment(
        (response.data.data?.usedAmount * 100) /
          (response.data.data?.totalAmount === 0 ? 1 : response.data.data?.totalAmount) >=
          50
          ? '옷 종류가 많군요'
          : '스폰지밥인가요?'
      );

      setMaxLargeCategoryName(response.data.data.maxLargeCategoryName);
      setMinLargeCategoryName(response.data.data.minLargeCategoryName);
      setBarValue(
        (response.data.data?.usedAmount * 100) /
          (response.data.data?.totalAmount === 0 ? 1 : response.data.data?.totalAmount)
      );
    } catch (error) {
      throw new Error('옷이 부족합니다.');
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
        imageDivClass="absolute top-[-35px] left-[0px]"
        imageUrl={`${barValue >= 50 ? '/images/uniform.png' : '/images/sponge.png'}`}
        imageClass="w-24 inline-block"
        mainTitle={shortReportComment}
      />

      <div className="flex flex-col items-center my-10">
        <OuterContainer>
          <InnerContainer style={{ width: `${barValue}%` }} />
        </OuterContainer>
        <div className="flex gap-[200px] mt-1 mb-8">
          <div className="text-[12px] text-gray-dark">단벌신사</div>
          <div className="text-[12px] text-gray-dark">패셔니스타</div>
        </div>
        {/* <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="w-[140px] h-[140px] p-2 bg-gray-button rounded-2xl flex flex-col justify-center items-center shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
            <PieChart1 className="pie-chart pie-chart1">
              <CenterSpan>{`${
                (analysisAmountList[0]?.usedAmount * 100) / analysisAmountList[0]?.totalAmount
              }%`}</CenterSpan>
            </PieChart1>
            <div className="text-[16px] mt-2">아우터</div>
          </div>
          <div className="w-[140px] h-[140px] p-2 bg-gray-button rounded-2xl flex flex-col justify-center items-center shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
            <PieChart1 className="pie-chart pie-chart1">
              <CenterSpan>{`${
                (analysisAmountList[1]?.usedAmount * 100) / analysisAmountList[1]?.totalAmount
              }%`}</CenterSpan>
            </PieChart1>
            <div className="text-[16px] mt-2">상의</div>
          </div>
          <div className="w-[140px] h-[140px] p-2 bg-gray-button rounded-2xl flex flex-col justify-center items-center shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
            <PieChart1 className="pie-chart pie-chart1">
              <CenterSpan>{`${
                (analysisAmountList[2]?.usedAmount * 100) / analysisAmountList[2]?.totalAmount
              }%`}</CenterSpan>
            </PieChart1>
            <div className="text-[16px] mt-2">하의</div>
          </div>
          <div className="w-[140px] h-[140px] p-2 bg-gray-button rounded-2xl flex flex-col justify-center items-center shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
            <PieChart1 className="pie-chart pie-chart1">
              <CenterSpan>{`${
                (analysisAmountList[3]?.usedAmount * 100) / analysisAmountList[3]?.totalAmount
              }%`}</CenterSpan>
            </PieChart1>
            <div className="text-[16px] mt-2">아이템</div>
          </div>
        </div> */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="w-[140px] h-[140px] p-2 bg-gray-button rounded-2xl flex flex-col justify-center items-center shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
            <div className="w-[100px] relative">
              <PieChartUsability
                percent={
                  Number.isNaN(
                    Math.round((analysisAmountList[0]?.usedAmount * 100) / analysisAmountList[0]?.totalAmount)
                  )
                    ? 0
                    : Math.round((analysisAmountList[0].usedAmount * 100) / analysisAmountList[0].totalAmount)
                }
              />
              <span className="absolute top-[45px] left-[20px]">
                {Number.isNaN(
                  Math.round((analysisAmountList[0]?.usedAmount * 100) / analysisAmountList[0]?.totalAmount)
                )
                  ? 0
                  : Math.round((analysisAmountList[0].usedAmount * 100) / analysisAmountList[0].totalAmount)}
                %
              </span>
            </div>
            <div className="text-lg mt-2">아우터</div>
          </div>
          <div className="w-[140px] h-[140px] p-2 bg-gray-button rounded-2xl flex flex-col justify-center items-center shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
            <div className="w-[100px] relative">
              <PieChartUsability
                percent={
                  Number.isNaN(
                    Math.round((analysisAmountList[1]?.usedAmount * 100) / analysisAmountList[1]?.totalAmount)
                  )
                    ? 0
                    : Math.round((analysisAmountList[1].usedAmount * 100) / analysisAmountList[1].totalAmount)
                }
              />
              <span className="absolute top-[45px] left-[20px]">
                {Number.isNaN(
                  Math.round((analysisAmountList[1]?.usedAmount * 100) / analysisAmountList[1]?.totalAmount)
                )
                  ? 0
                  : Math.round((analysisAmountList[1].usedAmount * 100) / analysisAmountList[1].totalAmount)}
                %
              </span>
            </div>
            <div className="text-lg mt-2">상의</div>
          </div>
          <div className="w-[140px] h-[140px] p-2 bg-gray-button rounded-2xl flex flex-col justify-center items-center shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
            <div className="w-[100px] relative">
              <PieChartUsability
                percent={
                  Number.isNaN(
                    Math.round((analysisAmountList[2]?.usedAmount * 100) / analysisAmountList[2]?.totalAmount)
                  )
                    ? 0
                    : Math.round((analysisAmountList[2].usedAmount * 100) / analysisAmountList[2].totalAmount)
                }
              />
              <span className="absolute top-[45px] left-[20px]">
                {Number.isNaN(
                  Math.round((analysisAmountList[2]?.usedAmount * 100) / analysisAmountList[2]?.totalAmount)
                )
                  ? 0
                  : Math.round((analysisAmountList[2].usedAmount * 100) / analysisAmountList[2].totalAmount)}
                %
              </span>
            </div>
            <div className="text-lg mt-2">하의</div>
          </div>
          <div className="w-[140px] h-[140px] p-2 bg-gray-button rounded-2xl flex flex-col justify-center items-center shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
            <div className="w-[100px] relative">
              <PieChartUsability
                percent={
                  Number.isNaN(
                    Math.round((analysisAmountList[3]?.usedAmount * 100) / analysisAmountList[3]?.totalAmount)
                  )
                    ? 0
                    : Math.round((analysisAmountList[3].usedAmount * 100) / analysisAmountList[3].totalAmount)
                }
              />
              <span className="absolute top-[45px] left-[20px]">
                {Number.isNaN(
                  Math.round((analysisAmountList[3]?.usedAmount * 100) / analysisAmountList[3]?.totalAmount)
                )
                  ? 0
                  : Math.round((analysisAmountList[3].usedAmount * 100) / analysisAmountList[3].totalAmount)}
                %
              </span>
            </div>
            <div className="text-lg mt-2">아이템</div>
          </div>
        </div>
        {/* 분석 문구 */}
        <div className="w-[90%] p-5 flex flex-col rounded-2xl bg-gray-button shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
          <p className="text-xl font-bold mb-2">{`${sessionStorage.getItem('nickname')}`}님!</p>
          <p className="text-base">{maxLargeCategoryName}를(을) 잘 활용하고 계시네요</p>
          <p className="text-base">하지만 {minLargeCategoryName}를(을) 활용하지 못하고 있어요</p>
          <p className="text-base">옷장에서 {minLargeCategoryName}를(을) 정리해보는건 어때요?</p>
        </div>
      </div>
    </>
  );
};

export default ReportCostPage;
