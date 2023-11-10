import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import styled, { keyframes } from 'styled-components';
import { useRef, useEffect } from "react";

import ColorPalette from "../../common/ColorPalette";
import ReportFrequencyCard from "../../report/atoms/ReportFrequencyCard";
import ReportFrequencyAmount from "../../report/atoms/ReportFrequencyAmount";
import CardAvgTap from "../atoms/CardAvgTap";


interface PropsType {
    title: string;
    img: string;
    comment: string;
    subComment?: string;
    link: string;
    state: number;
}

interface ColorAmountProp {
    color: string;
    amount: number;
}

// 5번째 바 키프레임 애니메이션
const slideAnimation = keyframes`
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }
`;

const OuterContainer = styled.div`
    width: 300px;
    height: 30px;
    border-radius: 15px;
    background-color: #D6D6D6;
    position: relative;
    overflow: hidden;
`;

const InnerContainer = styled.div`
    width: 80%;
    height: 100%;
    border-radius: 15px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, #FFBADB 0%, #FBE9EF 100%);
    animation: ${slideAnimation} 2s ease-in-out forwards;
`;

// 5번째 도넛 차트

const PieChart = styled.div`
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 80%;
  transition: 0.3s;
`;

const CenterSpan = styled.span`
  background: #F5F5F5;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  transform: translate(-50%, -50%);

`;

const pie1Animation = keyframes`
    0%{background : conic-gradient(#FFBAD2 0% 0%, #F5F5F5 0% 100%)}
    6%{background : conic-gradient(#FFBAD2 0% 5%, #F5F5F5 0% 100%)}
    12%{background : conic-gradient(#FFBAD2 0% 10%, #F5F5F5 0% 100%)}
    18%{background : conic-gradient(#FFBAD2 0% 15%, #F5F5F5 0% 100%)}
    25%{background : conic-gradient(#FFBAD2 0% 20%, #F5F5F5 0% 100%)}
    33%{background : conic-gradient(#FFBAD2 0% 25%, #F5F5F5 0% 100%)}
    38%{background : conic-gradient(#FFBAD2 0% 30%, #F5F5F5 0% 100%)}
    44%{background : conic-gradient(#FFBAD2 0% 35%, #F5F5F5 0% 100%)}
    50%{background : conic-gradient(#FFBAD2 0% 40%, #F5F5F5 0% 100%)}
    56%{background : conic-gradient(#FFBAD2 0% 45%, #F5F5F5 0% 100%)}
    62%{background : conic-gradient(#FFBAD2 0% 50%, #F5F5F5 0% 100%)}
    68%{background : conic-gradient(#FFBAD2 0% 55%, #F5F5F5 0% 100%)}
    75%{background : conic-gradient(#FFBAD2 0% 60%, #F5F5F5 0% 100%)}
    82%{background : conic-gradient(#FFBAD2 0% 65%, #F5F5F5 0% 100%)}
    88%{background : conic-gradient(#FFBAD2 0% 70%, #F5F5F5 0% 100%)}
    94%{background : conic-gradient(#FFBAD2 0% 75%, #F5F5F5 0% 100%)}
    100%{background : conic-gradient(#FFBAD2 0% 80%, #F5F5F5 80% 100%)}
`;

const PieChart1 = styled(PieChart)`
  &.pie-chart1 {
    animation: ${pie1Animation} 0.5s forwards;
    animation-timing-function: ease-in-out;
  }
`;


const AnalysisCardTap = ({ title, img, comment, link, subComment, state }: PropsType) => {
    const navigate = useNavigate();

    // 첫번째 도넛 차트
    const myAnalysisColor: ColorAmountProp[] = [
        { color: 'pink', amount: 10 },
        { color: 'blue', amount: 10 },
        { color: 'purple', amount: 22 },
        { color: 'yellow', amount: 6 },
    ];

    const labels: string[] = myAnalysisColor.map(row => row.color);
    const amount: number[] = myAnalysisColor?.map(row => row.amount);

    const backgroundArray = labels.map(row => {
    const color = row; // "red", "blue"
    const record = ColorPalette.find(function (item, index, arr) {
      return item.name === color; // return { name: 'red', kr: '빨강', background: '#FFA7A7' }
    });

    return record?.background; // '#FFA7A7'
  });

    const colorData = {
        labels,
        datasets: [
        {
            data: amount,
            backgroundColor: backgroundArray,
        },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false, // legend 비활성화
            },
        },
    };

    // 두번째 frequency 탭
    const frequencyMaxList = [
        {
          divColor: '#FFFFFF',
          clothesImage: '/images/clothes2.png',
          frequencyAmount: 30,
        },
        {
          divColor: '#FFFFFF',
          clothesImage: '/images/clothes3.png',
          frequencyAmount: 20,
        },
        {
          divColor: '#FFFFFF',
          clothesImage: '/images/clothes4.png',
          frequencyAmount: 10,
        },
      ];

    // 5번째 바 애니메이션 뷰 포인트 도착하면 실행하기
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && containerRef.current) {
                    containerRef.current.style.opacity = '1';
                }
            });
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    let renderContent = null;

    switch (state) {
        case 1:
            renderContent = 
                <div className="w-[50%] flex justify-center m-4">
                    <Doughnut data={colorData} options={options} />
                </div>
            break;
        case 2:
            renderContent = <div className="flex flex-row justify-evenly mb-8 px-4 py-3 rounded-2xl bg-[#D7D7D7] bg-opacity-40">
            {frequencyMaxList.map((item, index) => (
              <>
                <div className={`flex flex-col justify-center`}>
                    <div className="w-[90%] flex justify-center">
                        <ReportFrequencyCard divColor={item.divColor} clothesImage={item.clothesImage} />
                    </div>
                  <ReportFrequencyAmount frequencyAmount={item.frequencyAmount} />
                </div>
              </>
            ))}
          </div>
            break
        case 3:
            renderContent = 
                <div className="flex gap-4 mt-4 mb-6">
                    <CardAvgTap title="나의 옷장" img="/images/money.png" content="50만원" />
                    <CardAvgTap title="모으또 평균" img="/images/money.png" content="63만원" />
                </div>
            break;
        case 4:
            renderContent = 
                <div className="flex gap-4 mt-4 mb-6">
                    <CardAvgTap title="나의 옷장" img="/images/hanger.png" content="50벌" />
                    <CardAvgTap title="모으또 평균" img="/images/hanger.png" content="63벌" />
                </div>
            break;
        case 5:
            renderContent = 
                <div className="my-4">
                    <OuterContainer >
                        <InnerContainer ref={containerRef}/>
                    </OuterContainer>
                    <div className="flex gap-[200px] mt-1">
                        <div className="text-[12px] text-gray-dark">단벌신사</div>
                        <div className="text-[12px] text-gray-dark">패셔니스타</div>
                    </div>

                    <div className="flex justify-center mt-4 gap-6">
                        <div className="flex flex-col items-center">
                            <div className="w-[120px] h-[120px] bg-gray-button rounded-2xl flex justify-center items-center">
                                <PieChart1 className="pie-chart pie-chart1">
                                    <CenterSpan>80%</CenterSpan>
                                </PieChart1>
                            </div>
                            <div className="text-[16px] mt-2">상의</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-[120px] h-[120px] bg-gray-button rounded-2xl flex justify-center items-center">
                                <PieChart1 className="pie-chart pie-chart1">
                                    <CenterSpan>80%</CenterSpan>
                                </PieChart1>
                            </div>
                            <div className="text-[16px] mt-2">하의</div>
                        </div>
                    </div>

                </div>
            break;
        case 6:
            renderContent = 
            <div className="flex my-4 gap-4">
                <div className="bg-[#FFB9DF4F] rounded-2xl shadow-md min-w-[150px] relative p-4">
                    <div className="text-AppBody2 font-bold flex justify-end">봄 옷 5벌</div>
                    <div className="text-AppBody2 text-gray-dark flex justify-end">상의 3벌</div>
                    <div className="text-AppBody2 text-gray-dark flex justify-end">하의 3벌</div>
                    <img src="/images/season_spring.png" alt="spring" className="w-[100px] absolute -bottom-2 -left-6" />
                </div>
                <div className="bg-[#EC70481A] rounded-2xl shadow-md min-w-[150px] relative p-4">
                    <div className="text-AppBody2 font-bold flex justify-start">가을 옷 5벌</div>
                    <div className="text-AppBody2 text-gray-dark flex justify-start">상의 5벌</div>
                    <div className="text-AppBody2 text-gray-dark flex justify-start">하의 6벌</div>
                    <img src="/images/season_fall.png" alt="fall" className="w-[100px] absolute -bottom-2 -right-6" />
                </div>
            </div>
            break;

        default:
            renderContent = null;
            break;
    }

    return (
        <>
            <div className="bg-white rounded-2xl p-4 shadow-md relative mt-[50px] mb-[40px]" onClick={() => navigate(link)}>
                <img src={img} alt="rainbow" className="w-1/3 min-w-[117px] max-w-[130px] absolute -left-4 -top-10 z-0" />
                <div className="mt-6 z-100 whitespace-pre-wrap flex justify-center text-center text-AppTitle1 text-pink font-bold">
                    {title}
                </div>
                <div className="flex justify-center">{renderContent}</div>
                <div className="flex justify-center text-AppBody2 whitespace-pre-wrap">{comment}</div>
                {subComment && (
                    <div className="flex justify-center text-AppBody2 whitespace-pre-wrap">{subComment}</div>
                )}
            </div>
        </>
    )
}

export default AnalysisCardTap;