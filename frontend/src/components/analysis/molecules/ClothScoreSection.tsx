import styled from 'styled-components';
import { Fade } from 'react-awesome-reveal';
// import { RootState } from '../../../redux/store';
import VerticalBar from '../atoms/VerticalBar';
import ClothItem from '../atoms/ClothImage';
import { ClothesResultType } from '../../../pages/AnalysisPage';

const Container = styled.div`
  /* width: 70px; */
  display: flex;
  justify-content: between;
  align-items: center;
  flex-direction: row;
  gap: 20px;
`;

const ClothScoreSection = ({ clothesResult }: { clothesResult: ClothesResultType[] }) => {
  const category: string[] = ['아우터', '상의', '하의', '아이템'];

  return (
    <div className="w-[80%]">
      <div className="text-start text-AppBody1 font-bold my-4">오늘 스타일의 개별 점수는 얼마일까요?</div>
      <div className="flex flex-col justify-center gap-10">
        {clothesResult && clothesResult.length > 0
          ? clothesResult.map((item, index) => (
              <Container key={item.clothesId}>
                <ClothItem imgUrl={item.imageUrl} clothesId={item.clothesId.toString()} />
                <div className="flex flex-col justify-between w-full">
                  <div className="text-gray-700 text-AppBody3 mb-2 ">{category[index]}</div>
                  <div className="flex justify-between items-center">
                    <VerticalBar score={item.fitnessNum} />
                    <Fade triggerOnce>
                      <div className="text-AppBody3 shrink-0 w-[50px] text-center">{item.fitnessNum}점</div>
                    </Fade>
                  </div>
                  <Fade className="text-AppBody2 break-words mt-3" damping={1e-1} triggerOnce>
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
