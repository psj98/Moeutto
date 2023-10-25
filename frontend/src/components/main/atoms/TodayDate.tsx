const TodayDate = () => {
    // 오늘 날짜
    const today = new Date();
    // 형식 맞추기
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    
    return (
        <div>{formattedDate}</div>
    )
}

export default TodayDate;