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
const images = [
  'https://moeutto-bucket.s3.ap-northeast-2.amazonaws.com/6b14ae73-5094-42e0-9633-1ccf73e8748b/ae2656bc-b836-4735-a6a2-32707c1ae637..jpg',
  'https://moeutto-bucket.s3.ap-northeast-2.amazonaws.com/6b14ae73-5094-42e0-9633-1ccf73e8748b/a57ebe4a-d35b-4e2e-8e61-cb41efbd7a78..jpg',
  'https://moeutto-bucket.s3.ap-northeast-2.amazonaws.com/6b14ae73-5094-42e0-9633-1ccf73e8748b/fef6cff9-7c24-4279-ad90-c77f16f2c634..png',
  'https://moeutto-bucket.s3.ap-northeast-2.amazonaws.com/6b14ae73-5094-42e0-9633-1ccf73e8748b/d48c2dfe-2615-49d8-a2bc-80aadcd9ad4b..jpg',
];

const transformedData = retrievedClosetIds?.map((id, index) => ({
  id,
  score: scores[index],
  images: images[index],
}));

console.log(transformedData);

const ClothScoreSection = ({ score, contents }: ClothProps) => {
  return (
    <div className="w-[80%]">
      <div className="text-start text-WebBody2 font-bold my-4">옷의 개별 점수는 얼마일까요?</div>
      <div className="flex justify-center gap-10">
        {transformedData && transformedData.length > 0
          ? transformedData.map(item => (
              <Container>
                <ClothItem imgUrl={item.images} clothesId={item.id} />
                <VerticalBar score={item?.score} />
                <div className="text-WebBody2 font-bold mt-2 text-center">{item.score}점</div>
                <div className="text-WebBody4 mt-3">{contents}</div>
              </Container>
            ))
          : null}
      </div>
    </div>
  );
};

export default ClothScoreSection;
