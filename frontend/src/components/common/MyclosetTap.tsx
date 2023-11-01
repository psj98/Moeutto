import styled from 'styled-components';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Contvainer = styled.div`
  display: flex;
  width: 100%;

  .isMatched {
    background-color: #ffebf6;
  }
`;

const Tap = styled.div`
  width: 25%;
  height: 60px;
  /* padding: 30px; */
  margin: 30px auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 20px;
  background: #f9f9f9;
  box-shadow: 1px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: #ffebf6;
  }
`;

const MyClosetTap = () => {
  useEffect(() => {
    console.log(window.location.pathname);
  }, []);

  return (
    <Contvainer>
      <Tap className={window.location.pathname === '/mycloset' ? 'isMatched' : null}>
        <Link to="/mycloset" className="w-full h-full flex flex-col justify-center">
          옷장 구경
        </Link>
      </Tap>
      <Tap className={window.location.pathname === '/mycloset/add-cloth' ? 'isMatched' : null}>
        <Link to="/mycloset/add-cloth" className=" w-full h-full flex flex-col justify-center">
          옷장 등록
        </Link>
      </Tap>
      <Tap className={window.location.pathname === '/mycloset/report' ? 'isMatched' : null}>
        <Link to="/mycloset/report" className=" w-full h-full flex flex-col justify-center">
          옷장 분석
        </Link>
      </Tap>
    </Contvainer>
  );
};

export default MyClosetTap;
