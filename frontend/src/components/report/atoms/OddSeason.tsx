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
  min-height: 200px;
  height: auto;
  border-radius: 15px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding-bottom: 10px;
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
  const result1 = largeCategory.filter(item => {
    // season 배열의 각 요소 중 largeCategoryId가 현재 아이템의 id와 일치하는지 확인합니다.
    return season.find(c => c.largeCategoryId === item.id) !== undefined; // id를 한글 이름으로 맵핑한다
  });

  /*
   result1의 예상값 [
    {
      id: '002',
      name: '아우터',
    },
  ]
  result1이 largeCategory와 똑같아 보이는데 이러한 이유로 쓴다.
  1. season 배열에 대응되는 largeCategory 아이템만을 추출
  2. 해당 아이템에 대한 추후 추가적인 가공을 수행하기 위해서 사용 가능성.
  */

  const result2 = result1.map(item1 => {
    const matchingSeasonItem = season.find(c => c.largeCategoryId === item1.id);

    // matchingSeasonItem이 존재하면 해당 아이템에 대한 새로운 객체를 반환합니다.
    // 존재하지 않으면 { name: item1.name, amount: undefined }를 반환합니다.
    return {
      name: item1.name,
      amount: matchingSeasonItem ? matchingSeasonItem.amount : 0,
    };
  });

  /*
  result2 의 결과값
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
      <div className="flex justify-between absolute top-2 ps-3 pt-1 text-AppTitle text-left bg-red w-full px-3">
        <div className="bg-black w-[55px] rounded-lg text-white text-center flex items-center justify-center py-1">
          {name}
        </div>
        <div className="text-gray-800 text-AppBody2 my-auto">{month}월</div>
      </div>
      <div className="w-full pt-14 flex flex-wrap justify-evenly">
        {result2.map((item, index) => {
          if (Number(item.amount) > 0) {
            return (
              <div key={index} className="tags text-[13px]">
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
