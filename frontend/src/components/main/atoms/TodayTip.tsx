interface PropsType {
  content: string;
}

const TodayTip = ({ content }: PropsType) => {
  return (
    <div className="text-AppBody2 font-semibold ps-1">
      <span className="text-pink font-semibold me-2">TIP. </span>
      {content}
    </div>
  );
};

export default TodayTip;
