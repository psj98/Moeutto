import styled from 'styled-components';
import item from '../../../assets/images/clothes1.png';

const Box = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  margin-right: 10px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BuyItem = () => {
  return (
    <Card>
      <Box>
        <img src={item} />
      </Box>
      <div>가죽자켓</div>
      <div>100,000원</div>
    </Card>
  );
};

export default BuyItem;
