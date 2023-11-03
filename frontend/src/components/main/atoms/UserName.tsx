import React from "react";

const UserName = () => {
    // 세션스토리지에 유저 네임 저장되면 가져오기
    const userName: string = "주혁";
    
    return (
        <div className="font-bold text-WebBody2">{userName}님을 위한 추천</div>
    )
}

export default UserName;