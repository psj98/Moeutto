import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface ClothProps {
  score: string | number;
}

const motion = keyframes`
  0% {
    transform: translateY(100%);
  }
  2% {
    transform: translateY(98%);
  }
  4% {
    transform: translateY(96%);
  }
  6% {
    transform: translateY(94%);
  }
  8% {
    transform: translateY(92%);
  }
  10% {
    transform: translateY(90%);
  }
  12% {
    transform: translateY(88%);
  }
  14% {
    transform: translateY(86%);
  }
  16% {
    transform: translateY(84%);
  }
  18% {
    transform: translateY(82%);
  }
  20% {
    transform: translateY(80%);
  }
  22% {
    transform: translateY(78%);
  }
  24% {
    transform: translateY(76%);
  }
  26% {
    transform: translateY(74%);
  }
  28% {
    transform: translateY(72%);
  }
  30% {
    transform: translateY(70%);
  }
  32% {
    transform: translateY(68%);
  }
  34% {
    transform: translateY(66%);
  }
  36% {
    transform: translateY(64%);
  }
  38% {
    transform: translateY(62%);
  }
  40% {
    transform: translateY(60%);
  }
  42% {
    transform: translateY(58%);
  }
  44% {
    transform: translateY(56%);
  }
  46% {
    transform: translateY(54%);
  }
  48% {
    transform: translateY(52%);
  }
  50% {
    transform: translateY(50%);
  }
  52% {
    transform: translateY(52%);
  }
  54% {
    transform: translateY(54%);
  }
  56% {
    transform: translateY(56%);
  }
  58% {
    transform: translateY(58%);
  }
  60% {
    transform: translateY(60%);
  }
  62% {
    transform: translateY(62%);
  }
  64% {
    transform: translateY(64%);
  }
  66% {
    transform: translateY(66%);
  }
  68% {
    transform: translateY(68%);
  }
  70% {
    transform: translateY(70%);
  }
  72% {
    transform: translateY(72%);
  }
  74% {
    transform: translateY(74%);
  }
  76% {
    transform: translateY(76%);
  }
  78% {
    transform: translateY(78%);
  }
  80% {
    transform: translateY(80%);
  }
  82% {
    transform: translateY(82%);
  }
  84% {
    transform: translateY(84%);
  }
  86% {
    transform: translateY(86%);
  }
  88% {
    transform: translateY(88%);
  }
  90% {
    transform: translateY(90%);
  }
  92% {
    transform: translateY(92%);
  }
  94% {
    transform: translateY(94%);
  }
  96% {
    transform: translateY(96%);
  }
  98% {
    transform: translateY(98%);
  }
  100% {
    transform: translateY(0);
  }
`;

const ChartBackground = styled.div`
  width: 59px;
  height: 91.232px;
  background-color: #e7e7e7;
  position: relative;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(106, 106, 106, 0.25));
  overflow: hidden;

  #bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #faa0bf;
    border-radius: 10px;
  }
  .bar {
    animation: ${motion} 3s 1s ease-in-out forwards;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #faa0bf;
    border-radius: 10px;
  }
`;

const VerticalBar = ({ score }: ClothProps) => {
  let barHeight: string = '0';

  console.log(score);
  function calBarHeight() {
    if (typeof score === 'number') {
      barHeight = `${score}%`;
    } else {
      barHeight = `${score}%`;
    }
  }

  useEffect(() => {
    if (score) {
      calBarHeight();
    }
    const domObj = window.document.getElementById(score.toString());

    console.log(domObj);

    if (domObj) {
      domObj.style.height = barHeight;
      domObj.classList.add('bar'); // 애니메이션 클래스 추가
    }
  }, [score]);

  return (
    <ChartBackground>
      <div id={score?.toString()} className="bar"></div>
    </ChartBackground>
  );
};

export default VerticalBar;
