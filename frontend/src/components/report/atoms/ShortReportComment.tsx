interface ShortReportCommentProps {
  imageUrl: string;
  mainTitle: string;
  subTitle: string;
}

const ShortReportComment = ({ imageUrl, mainTitle, subTitle }: ShortReportCommentProps) => {
  return (
    <>
      {/* 분석 문구 */}
      <div className="flex flex-row direction-end justify-evenly bg-pink py-4 mb-10">
        {/* 이미지 */}
        <div className="flex items-center">
          <img className="w-20 inline-block" src={imageUrl} alt="분석 이미지" />
        </div>
        <div className="flex flex-col justify-center items-center">
          {/* 가치는 얼마일까? */}
          <p className="text-base text-white font-bold pb-2">{mainTitle}</p>
          {/* 분석 문구 */}
          <p className="text-xs text-white whitespace-pre-wrap">{subTitle}</p>
        </div>
      </div>
    </>
  );
};

export default ShortReportComment;
