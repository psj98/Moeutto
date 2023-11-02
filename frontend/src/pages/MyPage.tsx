import styled from 'styled-components';

import React, { ChangeEvent, useState } from 'react';
import Label from '../components/add/atoms/Label';
import TextInput from '../components/add/atoms/TextInput';

const handleSubmit = () => {};

const Button = styled.button`
  width: 15%;
  border-radius: 20px;
  margin: 10px 20px 0 0;
  height: 50px;
  padding: 10px;
  background: var(--button-bg-gray, rgba(245, 245, 245, 0.64));
  box-shadow: 1px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

// const Input = styled.input`
//   min-height: 50px;
//   width: 30%;
//   border: 1px solid black;
//   padding: 0 30px;
//   border-radius: 40px;
// `;

const MyPage = () => {
  const [nickname, setNickname] = useState<string>();

  const handleClothNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setNickname(e.target.value);
    } else {
      // 입력 값을 지울 때 맨 앞 한글자가 안 없어지는 에러 해결
      setNickname('');
    }
  };

  return (
    <>
      <div className="flex flex-col p-10">
        {/* 프로필 사진 */}
        <div className="mb-20">
          <img className="w-24" src="/images/bright.png" alt="프로필 이미지" />
        </div>

        {/* 닉네임 */}
        <div>
          {/* 닉네임 글자 */}
          <Label id="clothName" value="닉네임" />
          <div className="inline-block border-1 border w-[500px]">
            <TextInput placeholder="" value={nickname} onChange={handleClothNameChange} />
          </div>
          {/* <p>닉네임</p> */}
          {/* 닉네임 input */}
          {/* <Input className="mb-8" placeholder="닉네임" /> */}
        </div>

        {/* 옷장 공개 여부 */}
        <div className="pb-8">
          {/* 옷장 공개 여부 글자 */}
          <p className="text-WebBody1 pb-4">옷장 공개 여부</p>
          {/* on/off 버튼 */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink dark:peer-focus:ring-pink rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink"></div>
          </label>
        </div>

        {/* 계정 공개 여부 */}
        <div className="pb-8">
          {/* 계정 공개 여부 글자 */}
          <p className="text-WebBody1 pb-4">계정 공개 여부</p>
          {/* on/off 버튼 */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink dark:peer-focus:ring-pink rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink"></div>
          </label>
        </div>

        {/* 정보 수정 / 회원 탈퇴 버튼 */}
        <div>
          {/* 정보 수정 버튼 */}
          <Button className="text-xl" onChange={handleSubmit}>
            정보수정
          </Button>
          {/* 회원 탈퇴 버튼 */}
          <Button className="text-xl" onChange={handleSubmit}>
            회원탈퇴
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyPage;
