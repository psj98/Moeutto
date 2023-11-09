interface ReportAvgCardProps {
  imageUrl: string;
  imageAlt: string;
  closetTitle: string;
  closetValue: string;
}

const ReportAvgCard = ({ imageUrl, imageAlt, closetTitle, closetValue }: ReportAvgCardProps) => {
  return (
    <>
      <div className="p-3 rounded-2xl bg-gray-100 shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
        <div className="w-32 flex flex-col items-center justify-center">
          <p className="text-base font-bold">{closetTitle}</p>
          <div className="">
            <img className="w-20 inline-block" src={imageUrl} alt={imageAlt} />
          </div>
          <p className="text-center text-base font-bold">{closetValue}</p>
        </div>
      </div>
    </>
  );
};

export default ReportAvgCard;
