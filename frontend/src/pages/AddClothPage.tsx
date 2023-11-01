import * as React from 'react';
// import { Link } from 'react-router-dom';
import AddClothFormTemplate from '../components/add/templates/AddClothFormTemplate';
import MyClosetBar from '../components/common/MyClosetBar';

function AddClothPage() {
  return (
    <div className="myCloset">
      <div className="font-bold text-pink text-WebBody1">My Closet page</div>
      <MyClosetBar state={2} />
      <AddClothFormTemplate />
    </div>
  );
}

export default AddClothPage;
