import * as React from 'react';
import { Link } from 'react-router-dom';
// import { IoMdAlert } from 'react-icons/io';
import { AiFillAlert } from 'react-icons/ai';

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center content-center w-[100%] h-[100vh] text-center text-WebBody2">
      <div className="font-bold text-pink text-[100px] text-center">
        <AiFillAlert className="me-2 inline pb-3" size="100" color="rgb(250, 160, 191)" />
        404
      </div>
      잘못된 주소입니다.
      <Link to="/" className="text-WebBody1">
        <button className="border-4 p-4 rounded-full m-4 inline-block bg-gray-button">메인으로 가기</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
