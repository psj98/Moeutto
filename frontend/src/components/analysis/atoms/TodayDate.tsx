const TodayDate = () => {
  // 오늘 날짜
  const today = new Date();
  // 형식 맞추기
  const formattedDate = `${today.getFullYear()}. ${today.getMonth() + 1}. ${today.getDate()}.`;

  return <div className="font-semibold text-WebBody1">{formattedDate}</div>;
};

export default TodayDate;
