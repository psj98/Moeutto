import * as React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Link to="/main">메인 페이지</Link>
      <br />
      <Link to="/mycloset">나의 옷장</Link>
      <br />
      <Link to="/mypage">마이 페이지 </Link>
      <br />
    </div>
  );
}

export default App;
