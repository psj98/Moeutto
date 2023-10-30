import * as React from 'react';
// import { Link } from 'react-router-dom';
import AddClothFormPage from '../components/mycloset/add/templates/AddClothFormPage';

function MyCloset() {
  return (
    <div className="myCloset">
      <div className="font-bold text-pink text-WebBody1">My Closet page</div>
      <AddClothFormPage />
    </div>
  );
}

export default MyCloset;
