import styled from 'styled-components';
import { Fade } from 'react-awesome-reveal';
// import { RootState } from '../../../redux/store';
import VerticalBar from '../atoms/VerticalBar';
import ClothItem from '../atoms/ClothImage';
import { ClothesResultType } from '../../../pages/AnalysisPage';

const Container = styled.div`
  /* width: 70px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;
`;

const ClothScoreSection = ({ clothesResult }: { clothesResult: ClothesResultType[] }) => {
  return (
    <div className="w-[80%]">
      <div className="text-start text-WebBody2 font-bold my-4">옷의 개별 점수는 얼마일까요?</div>
      <div className="flex flex-col justify-center gap-10">
        {clothesResult && clothesResult.length > 0
          ? clothesResult.map(item => (
              <Container key={item.clothesId}>
                <ClothItem imgUrl={item.imageUrl} clothesId={item.clothesId.toString()} />
                <div className="flex flex-col">
                  <VerticalBar score={item.fitnessNum} />
                  <Fade triggerOnce>
                    <div className="text-AppBody2 font-bold mt-2 text-center shrink-0">{item.fitnessNum}점</div>
                  </Fade>
                </div>
                <div className="w-min-[100px]">
                  <Fade className="text-AppBody2 mt-3" damping={1e-1} triggerOnce>
                    {item.result}
                  </Fade>
                </div>
              </Container>
            ))
          : null}
      </div>
    </div>
  );
};

export default ClothScoreSection;
