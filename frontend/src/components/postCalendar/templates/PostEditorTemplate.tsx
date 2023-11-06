import { useSelector } from 'react-redux';
// import SortedCategory from '../../common/category/atoms/SortedCategory';
import { RootState } from '../../../redux/store';

const PostEditorTemplate = () => {
  const selectedClosetUrls = useSelector((state: RootState) => state.post.selectedClosetUrls);

  return (
    <div>
      <div>{selectedClosetUrls}</div>
    </div>
  );
};

export default PostEditorTemplate;
