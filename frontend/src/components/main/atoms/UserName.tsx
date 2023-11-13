import React from "react";

const UserName = () => {
  // 세션스토리지에 유저 네임 저장되면 가져오기
  const userName: string = `${sessionStorage.getItem('nickname')}`;

  return <div className="font-bold text-AppBody1 w-2/3 min-w-[150px] max-w-[200px] mb-6">{userName}님을 위한 추천</div>;
};

export default UserName;