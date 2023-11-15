import styled, { keyframes } from 'styled-components';
import { CategoryAmountType } from '../../../pages/ReportSeasonPage';
import { largeCategory } from '../../common/CategoryType';
// import spring from '../../../assets/images/season/spring.png';
// import atumn from '../../../assets/images/season/atumn.png';

interface SeasonData {
  season: CategoryAmountType[];
  name: string;
}

const motion = keyframes`
  0% {
    transform: translateY(40px);
  }
  50% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(40px);
  }
`;

const Card = styled.div`
  margin-left: 30px;
  margin-top: 30px;
  width: 30%;
  height: 400px;
  box-shadow: 4px 4px 4px 0 gray;
  border-radius: 25px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* animation: ${motion} 3s 1s linear infinite alternate; // Apply the animation here */
`;

const OddSeason = ({ season, name }: SeasonData) => {
  const result2 = largeCategory
    .filter(item => {
      return season.find(c => c.largeCategoryId === item.id) !== undefined; // id를 한글 이름으로 맵핑한다
    })
    .map((item, index) => {
      return {
        name: item.name, // 예시로 'name'을 가져옴
        amount: season[index].amount, // 여기에서 실제로 'amount' 값을 가져와야 함
      };
    });

  /* result2 의 결과값
   [{name: '아우터', amount: 1},
  {name: '상의', amount: 3},
  {name: '하의', amount: 2},
  {name: '아이템', amount: 0}]
  */

  return (
    <Card
      style={{
        position: 'relative',
        background: name === '봄' ? '#69C683' : '#BA9BEB',
      }}>
      <div className="text-WebTitle">{name}</div>
      <div>
        {result2.map((item, index) => (
          <div key={index}>
            {item.name} - {item.amount} 벌
          </div>
        ))}
      </div>
      {/* <img src={name === '봄' ? spring : atumn} className="w-[800px] object-fill " /> */}
    </Card>
  );
};

export default OddSeason;
