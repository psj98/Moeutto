interface ReportCommentProps {
  imageUrl: string;
  mainTitle: string;
  subTitle: string;
}

const ReportComment = ({ imageUrl, mainTitle, subTitle }: ReportCommentProps) => {
  return (
    <>
      {/* 간단 분석 문구 */}
      <div className="relative flex flex-col bg-[#FEDFEA] py-4 mb-3">
        {/* 사진 */}
        <div className="absolute top-[-55px] left-[-10px]">
          <img className="w-36 inline-block" src={imageUrl} alt="지갑 이미지" />
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

export default ReportComment;
