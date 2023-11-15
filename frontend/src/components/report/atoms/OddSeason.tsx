import styled from 'styled-components';
import { CategoryAmountType } from '../../../pages/ReportSeasonPage';
import { largeCategory } from '../../common/CategoryType';
// import spring from '../../../assets/images/season/spring.png';
// import atumn from '../../../assets/images/season/atumn.png';

interface SeasonData {
  season: CategoryAmountType[];
  name: string;
  month: string;
}

const Card = styled.div`
  width: 45%;
  height: 200px;
  border-radius: 15px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0px 4px 3px 0 grey;
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

const OddSeason = ({ season, name, month }: SeasonData) => {
  const result2 = largeCategory
    .filter(item => {
      return season.find(c => c.largeCategoryId === item.id) !== undefined; // id를 한글 이름으로 맵핑한다
    })
    .map((item, index) => {
      return {
        name: item.name, // 예시로 'name'을 가져옴
        amount: season[index]?.amount, // 여기에서 실제로 'amount' 값을 가져와야 함
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
      }}
      className="shadow-lg">
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

export default OddSeason;
