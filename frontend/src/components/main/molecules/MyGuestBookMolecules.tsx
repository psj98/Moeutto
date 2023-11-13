interface PropsType {
    nickname: string;
    regDate: string;
    post: string;
}

const MyGuestBookMolecules = ({ nickname, regDate, post }: PropsType) => {
    const inputDate = new Date(regDate);

    // 월과 일을 추출
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해주고, 2자리로 포맷팅
    const day = inputDate.getDate().toString().padStart(2, '0'); // 2자리로 포맷팅
  
    // 'MM-DD' 형식으로 반환
    const formattedDate = `${month}-${day}`;

    return (
        <>
            <div className="flex">
                <div className="flex justify-start me-2">{formattedDate}</div>
                <div>{post}</div>
                <div className="flex justify-items-end">{nickname}</div>
            </div>
        </>
    )
}

export default MyGuestBookMolecules;