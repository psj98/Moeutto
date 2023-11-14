import MyClosetBar from '../components/common/MyClosetBar';
import CategoryTapOrganism from '../components/mycloset/organisms/CategoryTapOrganism';

const MyClosetPage = () => {
  return (
    <>
      <div className="font-bold text-WebBody1">나의 옷장</div>
      <MyClosetBar state={1} />
      <CategoryTapOrganism />
    </>
  );
};

export default MyClosetPage;
