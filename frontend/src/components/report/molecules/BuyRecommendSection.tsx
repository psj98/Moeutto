// import BuyItem from '../atoms/BuyRecommend';
import styled from 'styled-components';
import T1 from '../../../assets/images/T1.jpg';
import T2 from '../../../assets/images/T2.jpg';
import T3 from '../../../assets/images/T3.jpg';

const Box = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  margin-right: 10px;
  overflow: hidden;
`;

const Card = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BuyRecommendSection = () => {
  return (
    <div className="w-full flex justify-evenly p-9">
      <Card>
        <Box>
          <img src={T1} />
        </Box>
        <div>반팔</div>
        <div>14,320원</div>
      </Card>
      <Card>
        <Box>
          <img src={T2} />
        </Box>
        <div>반팔티 핑크</div>
        <div>39,500원</div>
      </Card>
      <Card>
        <Box>
          <img src={T3} />
        </Box>
        <div>올웨이즈 오리지널 티</div>
        <div>29,800원</div>
      </Card>
    </div>
  );
};

export default BuyRecommendSection;
