import { useState } from "react";

const UserName = () => {
    const [userName, setUserName] = useState<string>("주혁");
    return (
        <div>{userName}님을 위한 추천</div>
    )
}

export default UserName;