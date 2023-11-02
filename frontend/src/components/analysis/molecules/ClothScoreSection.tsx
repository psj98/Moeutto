import styled from 'styled-components';
// import { RootState } from '../../../redux/store';
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

// 선택한 옷 가져오기
const storedClosetIds = localStorage.getItem('selectedClosetIds');
const retrievedClosetIds = JSON.parse(storedClosetIds);

// 점수 강제로 추가하기 (중간점검)
const scores = [80, 95, 70, 60];
// 이미지 강제로 추가하기
const transformedData = retrievedClosetIds.map((id, index) => ({
    id,
    score: scores[index % scores.length] 
}));

console.log(transformedData);

const ClothScoreSection = ({ score, contents }: ClothProps) => {
  return (
    <div className="w-[80%]">
      <div className="text-start text-WebBody2 font-bold my-4">옷의 개별 점수는 얼마일까요?</div>
      <div className='flex justify-center gap-10'>

        {transformedData.map((item) => (
            <Container>
              <ClothItem imgUrl="../../../assets/images/profile.jpg" clothesId={item.id} />
              <VerticalBar score={item.score} />
              <div className="text-WebBody2 font-bold mt-2 text-center">{item.score}점</div>
              <div className="text-WebBody4 mt-3">{contents}</div>
            </Container>
        ))}
      </div>
    </div>
  );
};

export default ClothScoreSection;
