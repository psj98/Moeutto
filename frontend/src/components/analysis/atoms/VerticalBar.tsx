import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface ClothProps {
  score: string | number;
}

const motion = keyframes`
0% {
  transform: translateX(-100%);
}
100% {
  transform: translateX(0%);
}
`;

const ChartBackground = styled.div<{ width: number }>`
  height: 20px;
  width: 120px;
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
    height: inherit;
    width: ${props => (props.width ? `${props.width}%` : '0px')};
    background-color: #faa0bf;
    border-radius: 10px;
  }
`;

const VerticalBar = ({ score }: ClothProps) => {
  const [barwidth, setBarwidth] = useState<number>(0);

  function calBarwidth() {
    if (typeof score === 'number') {
      setBarwidth(score);
    } else {
      setBarwidth(Number(score));
    }
  }

  useEffect(() => {
    if (score) {
      calBarwidth();
    }
    const domObj = window.document.getElementById(score.toString());

    if (domObj) {
      // domObj.style.width = `barwidth.toString()+%`;
      domObj.classList.add('bar'); // 애니메이션 클래스 추가
    }
  }, [score]);

  return (
    <ChartBackground width={barwidth}>
      <div id={score?.toString()} className="bar"></div>
    </ChartBackground>
  );
};

export default VerticalBar;
