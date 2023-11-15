import styled, { keyframes } from 'styled-components';
import { CategoryAmountType } from '../../../pages/ReportSeasonPage';
import { largeCategory } from '../../common/CategoryType';

interface SeasonData {
  season: CategoryAmountType[];
  name: string;
}

const motion = keyframes`
  0% {
    transform: translateY(-40px);
  }
  50% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-40px);
  }
`;

const Card = styled.div`
  margin-left: 30px;
  margin-top: 30px;
  width: 45%;
  height: 250px;
  box-shadow: 4px 4px 4px 0 gray;
  border-radius: 25px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  opacity: 0.94;

  font-weight: 700;

  .tags {
    background-color: white;
    border-radius: 30px;
    padding: 7px 9px;
    margin: 2px 7px;
    text-align: center;
    flex-shrink: 0;
  }
  /* animation: ${motion} 3s 1s linear infinite alternate; // Apply the animation here */
`;

const EvenSeason = ({ season, name }: SeasonData) => {
  const result2 = largeCategory
    .filter(item => {
      return season.find(c => c.largeCategoryId === item.id) !== undefined;
    })
    .map((item, index) => {
      const amount = season[index]?.amount;

      return {
        name: item.name, // 예시로 'name'을 가져옴
        amount, // 여기에서 실제로 'amount' 값을 가져와야 함
      };
    });

  return (
    <Card
      style={{
        position: 'relative',
        background: name === '여름' ? '#F5C249' : '#6A96ED',
      }}>
      <div className="text-AppTitle">{name}</div>
      <div className="flex flex-wrap w-full">
        {result2.map((item, index) => (
          <div key={index} className="tags text-AppBody3">
            {item.name} {item.amount} 벌
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EvenSeason;
