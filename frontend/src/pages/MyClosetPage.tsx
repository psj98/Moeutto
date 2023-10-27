import * as React from 'react';
import { Link } from 'react-router-dom';
import AddClothForm from '../components/mycloset/add/organisms/AddClothForm';

function MyCloset() {
  return (
    <div className="myCloset">
      <div className="font-bold text-pink text-WebBody1">My Closet page</div>
      <Link to="/main">메인 페이지</Link>
      <br />
      <Link to="/mycloset">나의 옷장</Link>
      <br />
      <Link to="/mypage">마이 페이지 </Link>
      <AddClothForm></AddClothForm>
    </div>
  );
}

export default MyCloset;
