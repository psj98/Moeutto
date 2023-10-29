import * as React from 'react';
// import { Link } from 'react-router-dom';
import AddClothForm from '../components/mycloset/add/organisms/AddClothForm';

function MyCloset() {
  return (
    <div className="myCloset">
      <div className="font-bold text-pink text-WebBody1">My Closet page</div>
      <AddClothForm></AddClothForm>
    </div>
  );
}

export default MyCloset;
