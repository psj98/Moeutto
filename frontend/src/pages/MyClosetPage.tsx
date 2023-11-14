import MyClosetBar from '../components/common/MyClosetBar';
import CategoryTapOrganism from '../components/mycloset/organisms/CategoryTapOrganism';
import PickTitle from '../components/pickpick/atoms/PickTitle';

const MyClosetPage = () => {
  return (
    <>
      <PickTitle></PickTitle>

      <MyClosetBar state={1} />
      <CategoryTapOrganism />
    </>
  );
};

export default MyClosetPage;
