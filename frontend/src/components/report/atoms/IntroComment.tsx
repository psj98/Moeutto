interface IntroCommentProps {
  nickname: string;
  imageUrl: string;
}

const IntroComment = ({ nickname, imageUrl }: IntroCommentProps) => {
  return (
    <>
      {/* OO님의 옷장을 분석했어요 문구 */}
      <div className="flex flex-row justify-center my-7">
        <div className="flex flex-col mr-8 items-center justify-center">
          <p className="text-AppBody1 font-bold">{nickname}님의</p>
          <p className="text-AppBody1 font-bold">옷장을 분석했어요</p>
        </div>
        <div className="text-center items-center justify-center">
          <img className="" src={imageUrl} alt="분석 이미지" />
        </div>
      </div>
    </>
  );
};

export default IntroComment;
