import styled from 'styled-components';
import { CategoryAmountType } from '../../../pages/ReportSeasonPage';
import { largeCategory } from '../../common/CategoryType';

interface SeasonData {
  season: CategoryAmountType[];
  name: string;
  month: string;
}

const Card = styled.div`
  width: 45%;
  height: 200px;
  box-shadow: 0px 4px 3px 0 grey;
  border-radius: 15px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  opacity: 0.94;
  font-weight: 800;
  margin-bottom: 12px;

  .tags {
    background-color: white;
    border-radius: 30px;
    padding: 9px 9px;
    margin: 3px 5px;
    text-align: center;
    flex-shrink: 0;
    font-weight: 700;
  }
`;

const EvenSeason = ({ season, name, month }: SeasonData) => {
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
      {' '}
      <div className="flex justify-between p-1 text-AppTitle text-left bg-red w-full px-3">
        <div className="bg-black w-[60px] rounded-lg text-white text-center py-1">{name}</div>
        <div className="text-gray-800 text-AppBody2 my-auto">{month}월</div>
      </div>
      <div className="flex flex-wrap w-full justify-evenly">
        {result2.map((item, index) => {
          if (Number(item.amount) > 0) {
            return (
              <div key={index} className="tags text-AppBody2">
                {item.name} {item.amount}벌
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </Card>
  );
};

export default EvenSeason;
