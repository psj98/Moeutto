interface ShortReportCommentProps {
  imageDivClass: string;
  imageUrl: string;
  imageClass: string;
  mainTitle: string;
  subTitle: string;
}

const ShortReportComment = ({ imageDivClass, imageUrl, imageClass, mainTitle, subTitle }: ShortReportCommentProps) => {
  return (
    <>
      {/* 간단 분석 문구 */}
      <div className="relative flex flex-col bg-[#FEDFEA] py-4 mb-3">
        {/* 사진 */}
        <div className={imageDivClass}>
          <img className={imageClass} src={imageUrl} alt="지갑 이미지" />
        </div>
        {/* 문구 */}
        <div className="text-center ">
          {/* 메인 문구 */}
          <p className="text-2xl text-[#FF78A5] font-bold pb-1">{mainTitle}</p>
          {/* 하단 문구 */}
          <p className="text-xs text-slate-400">{subTitle}</p>
        </div>
      </div>
    </>
  );
};

export default ShortReportComment;
