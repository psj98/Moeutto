import styled from 'styled-components';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { authInstance } from '../api/api';

import Label from '../components/add/atoms/Label';

const handleSubmit = () => {};

const Button = styled.button``;
const Input = styled.input``;

interface MyPageItemType {
  nickname: string;
  imageUrl: string;
  closetFind: boolean;
  accountFind: boolean;
}

const MyPage = () => {
  const [nickname, setNickname] = useState<string>();
  const [myPageInfo, setMyPageInfo] = useState<MyPageItemType | null>();

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setNickname(e.target.value);
    } else {
      // 입력 값을 지울 때 맨 앞 한글자가 안 없어지는 에러 해결
      setNickname('');
    }
  };

  const fetchData = async () => {
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.get('/members/my-page');

      console.log('마이페이지 데이터 조회 성공', response.data.data);
      console.log('닉넴', nickname);

      // const myInfo: myPageItem = response.data.data.MemberMyPageResponseDto(row => ({
      //   nickname: row.nickname,
      //   imageUrl: row.imageUrl,
      //   closetFind: row.closetFind,
      //   accountFind: row.accountFind,
      // }));

      setMyPageInfo(response.data.data);
      setNickname(response.data.data.nickname);

      console.log(myPageInfo);
    } catch (error) {
      console.log('마이페이지 데이터 조회 실패', error);

      throw new Error('마이페이지 데이터 조회 실패 토큰 및 저장된 데이터를 확인하세요');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log('체크', myPageInfo);
  // }, [myPageInfo]);

  return (
    <>
      <div className="flex flex-col text-AppBody1">
        {/* 프로필 사진 */}
        <div className="my-10 text-center">
          <img className="w-24 inline-block" src={`${myPageInfo?.imageUrl}`} alt="프로필 이미지" />
        </div>

        {/* 닉네임 */}
        <div className="mb-6">
          {/* 닉네임 글자 */}
          <Label id="nickName" value="닉네임" />
          {/* 닉네임 Input */}
          <Input
            className="w-full border border-1 rounded-xl indent-1 p-1 text-AppBody1"
            placeholder="닉네임"
            value={nickname}
            onChange={handleNicknameChange}></Input>
        </div>

        {/* 옷장 공개 여부 */}
        <div className="mb-6">
          {/* 옷장 공개 여부 글자 */}
          <p className="mb-2">옷장 공개 여부</p>
          {/* on/off 버튼 */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={myPageInfo?.accountFind} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-pink dark:peer-focus:ring-pink rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink"></div>
          </label>
        </div>

        {/* 계정 공개 여부 */}
        <div className="mb-6">
          {/* 계정 공개 여부 글자 */}
          <p className="mb-2">계정 공개 여부</p>
          {/* on/off 버튼 */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={myPageInfo?.closetFind} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-pink dark:peer-focus:ring-pink rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink"></div>
          </label>
        </div>

        {/* 정보 수정 / 회원 탈퇴 버튼 */}
        <div className="flex flex-row mb-4">
          {/* 정보 수정 버튼 */}
          <Button
            className="pt-2 pb-1 px-3 mr-4 rounded-xl bg-neutral-100 shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]"
            onChange={handleSubmit}>
            정보수정
          </Button>
          {/* 회원 탈퇴 버튼 */}
          <Button
            className="pt-2 pb-1 px-3 rounded-xl bg-neutral-100 shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]"
            onChange={handleSubmit}>
            회원탈퇴
          </Button>
        </div>
      </div>
    </>
  );
};

export default MyPage;
