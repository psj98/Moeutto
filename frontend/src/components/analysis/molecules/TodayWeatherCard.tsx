import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import TodayDate from '../atoms/TodayDate';
import WeatherIconList from '../atoms/WeatherIcon';

interface Props {
  idx: number;
}

// 아이콘 위아래로 움직이는 애니메이션
const motion = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 80%;
  padding: 10px;
  position: relative;
  height: 200px;
  border-radius: 20px;
  color: white;
  margin-top: 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 30px;

  .date {
    position: absolute;
    color: black;
    top: -25px;
    left: -20px;
    letter-spacing: 3.2px;
  }

  .icon {
    position: absolute;
    bottom: -50px;
    right: -70px;
    width: 250px;
    animation: ${motion} 2s 1s linear infinite alternate; // Apply the animation here
  }
`;

const TodayWeatherCard = ({ idx }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const weatherList1 = 
    [ "", "오늘은 날씨가 화창하고", "오늘은 날씨가 흐리고", "오늘은 구름이 있지만", "오늘은 날씨가 흐리고", "오늘은 날씨가 흐리고", "오늘은 번쩍번쩍 번개가 있어요" ]

    const weatherList2 = 
    [ "", "맑은 날이네요", "바람이 많이 부네요", "해가 있어 맑은 날이에요", "비가 올 예정이에요", "눈이 올 예정이에요", "번개를 조심하세요" ]

    const firstTip: string = window.localStorage.getItem('first');
    const secondTip: string = window.localStorage.getItem('second');


  // dynamically Loading image 힘들었다
  useEffect(() => {
    import(`../../../assets/icons/weather/${WeatherIconList[idx].icon}`)
      .then(module => setImageSrc(module.default))
      .catch(error => {
        /* eslint-disable no-console */
        console.error('Failed to load icon image:', error);
        /* eslint-enable no-console */
      });
  }, [idx]);

  return (
    <Container>
      <Card className="bg-pink-dark">
        <div className="date">
          <TodayDate />
        </div>
        {imageSrc ? <img src={imageSrc} alt="Weather Icon" className="icon" /> : null}
        <div className="text-WebBody1">{weatherList1[idx]} <br />{weatherList2[idx]}</div>
        <div>
          <div className="text-WebBody4">TIP. {firstTip}</div>
          <div className="text-WebBody4">TIP. {secondTip}</div>
        </div>
      </Card>
    </Container>
  );
};

export default TodayWeatherCard;
