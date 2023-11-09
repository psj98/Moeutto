interface ReportCommentProps {
  divPadding?: string;
  imageUrl: string;
  imageClass: string;
  mainTitle: string;
  subTitle: string;
}

const ReportComment = ({ imageUrl, imageClass, mainTitle, subTitle }: ReportCommentProps) => {
  return (
    <>
      {/* 분석 문구 */}
      <div className="flex flex-row bg-pink p-4 mb-10 items-center justify-center">
        {/* 이미지 */}
        <div className="flex-1 text-center mr-2">
          <img className={imageClass} src={imageUrl} alt="분석 이미지" />
        </div>
        <div className="flex-[3_0_0%] flex-col">
          {/* 가치는 얼마일까? */}
          <p className="text-base text-center text-white font-bold pb-2">{mainTitle}</p>
          {/* 분석 문구 */}
          <p className="text-xs text-center text-white whitespace-pre-wrap">{subTitle}</p>
        </div>
      </div>
    </>
  );
};

export default ReportComment;
