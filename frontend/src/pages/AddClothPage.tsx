import * as React from 'react';
// import { Link } from 'react-router-dom';
import AddClothFormTemplate from '../components/add/templates/AddClothFormTemplate';

function AddClothPage() {
  return (
    <div className="myCloset">
      <div className="font-bold text-pink text-WebBody1">My Closet page</div>
      <AddClothFormTemplate />
    </div>
  );
}

export default AddClothPage;
