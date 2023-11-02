import * as React from 'react';
import { Link } from 'react-router-dom';

function Work() {
  return (
    <div className="Work">
      <div className="font-bold text-pink text-WebBody1">Work page</div>
      <Link to="/main">메인 페이지</Link>
      <br />
      <Link to="/mycloset">나의 옷장</Link>
      <br />
      <Link to="/mypage">마이 페이지 </Link>
      <br />
      <Link to="/mycloset/list">나의 옷장 전체 목록</Link>
    </div>
  );
}

export default Work;
