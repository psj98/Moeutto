import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HorizontalStackedBar from '../atoms/HorizontalStackedBar';
import { ClothesResultType } from '../../../pages/AnalysisPage';

const TotalScore = styled.div`
  width: 80%;
  overflow: auto;
  margin: 38px auto;
`;

const TotalScoreSection = ({ clothesResult }: { clothesResult: ClothesResultType[] }) => {
  const [totalScore, setTotalScore] = useState<number>(0);
  const [expression, setExpression] = useState<string>('');

  useEffect(() => {
    const sum = clothesResult?.reduce((accumulator, currentValue) => accumulator + currentValue.fitnessNum, 0);

    setTotalScore(sum / 4);
  }, [clothesResult]);

  // 점수에 따른 메시지 선정 로직
  useEffect(() => {
    if (totalScore > 60) {
      setExpression('아주 적절해요! 👍');
    } else if (totalScore < 30) {
      setExpression('다른 옷을 골라봐요.. 👎');
    } else {
      setExpression('그냥 무난합니다.. 😑');
    }
  }, [totalScore]);

  return (
    <TotalScore>
      <div className="text-start text-WebBody2 font-bold mx-4">당신의 총 점수는 얼마일까요?</div>
      <HorizontalStackedBar></HorizontalStackedBar>
      <div className="text-center text-WebBody2 font-bold mt-4">
        당신의 총 점수는 {totalScore}점! {expression}
      </div>
    </TotalScore>
  );
};

export default TotalScoreSection;
