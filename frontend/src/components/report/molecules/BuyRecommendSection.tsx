import BuyItem from '../atoms/BuyRecommend';

const BuyRecommendSection = () => {
  return (
    <div className="w-full flex justify-evenly p-9">
      <BuyItem />
      <BuyItem />
      <BuyItem />
    </div>
  );
};

export default BuyRecommendSection;
