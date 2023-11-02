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
    bottom: -60px;
    right: -60px;
    width: 300px;
    animation: ${motion} 2s 1s linear infinite alternate; // Apply the animation here
  }
`;

const TodayWeatherCard = ({ idx }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

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
        <div className="text-WebBody1">오늘의 날씨는 흐려요 </div>
        <div>
          <div className="text-WebBody4">TIP. 보온에 신경쓰세요</div>
          <div className="text-WebBody4">TIP. 저녁에 추워요. 아우터를 챙기세요.</div>
        </div>
      </Card>
    </Container>
  );
};

export default TodayWeatherCard;
