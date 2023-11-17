import MyClosetBar from '../components/common/MyClosetBar';
import CategoryTapOrganism from '../components/mycloset/organisms/CategoryTapOrganism';

const MyClosetPage = () => {
  return (
    <>
      <MyClosetBar state={1} />
      <div className="mt-8">
        <CategoryTapOrganism />
      </div>
    </>
  );
};

export default MyClosetPage;
