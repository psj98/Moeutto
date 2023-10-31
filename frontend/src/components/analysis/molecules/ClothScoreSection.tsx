import styled from 'styled-components';
import VerticalBar from '../atoms/VerticalBar';
import ClothItem from '../atoms/ClothImage';

interface ClothProps {
  score: string | number;
  contents: string;
}

const Container = styled.div`
  /* width: 70px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ClothScoreSection = ({ score, contents }: ClothProps) => {
  return (
    <div className="w-[80%]">
      <div className="text-start text-WebBody2 font-bold my-4">옷의 개별 점수는 얼마일까요?</div>
      <Container>
        <ClothItem imgUrl="../../../assets/images/profile.jpg" clothesId="1" />
        <VerticalBar score={score} />
        <div className="text-WebBody2 font-bold mt-2 text-center">{score}점</div>
        <div className="text-WebBody4 mt-3">{contents}</div>
      </Container>
    </div>
  );
};

export default ClothScoreSection;
