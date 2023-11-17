import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface ClothProps {
  score: string | number;
}

const motion = keyframes`
0% {
  transform: translateY(100%);
}
/* ... (이하 애니메이션 내용 복사) ... */
100% {
  transform: translateY(0);
}

`;

const ChartBackground = styled.div<{ height: number }>`
  width: 59px;
  height: 119px;
  background-color: #e7e7e7;
  position: relative;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(106, 106, 106, 0.25));
  overflow: hidden;

  .bar {
    animation: ${motion} 2s 1s ease-in-out forwards;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${props => (props.height ? `${props.height}%` : '0px')};
    background-color: #faa0bf;
    border-radius: 10px;
  }
`;

const VerticalBar = ({ score }: ClothProps) => {
  const [barHeight, setBarHeight] = useState<number>(0);

  function calBarHeight() {
    if (typeof score === 'number') {
      setBarHeight(score);
    } else {
      setBarHeight(Number(score));
    }
  }

  useEffect(() => {
    if (score) {
      calBarHeight();
    }
    const domObj = window.document.getElementById(score.toString());

    if (domObj) {
      // domObj.style.height = `barHeight.toString()+%`;
      domObj.classList.add('bar'); // 애니메이션 클래스 추가
    }
  }, [score]);

  return (
    <ChartBackground height={barHeight}>
      <div id={score?.toString()} className="bar"></div>
    </ChartBackground>
  );
};

export default VerticalBar;
