interface ReportAvgCardProps {
  image: imageObject;
  closet: closetObject;
}

interface imageObject {
  url: string;
  alt: string;
}

interface closetObject {
  title: string;
  value: string;
}

const ReportAvgCard = ({ image, closet }: ReportAvgCardProps) => {
  return (
    <>
      <div className="p-3 rounded-2xl bg-gray-100 shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]">
        <div className="w-32 flex flex-col items-center justify-center">
          <p className="text-base font-bold">{closet.title}</p>
          <div className="">
            <img className="w-20 inline-block" src={image.url} alt={image.alt} />
          </div>
          <p className="text-center text-base font-bold">{closet.value}</p>
        </div>
      </div>
    </>
  );
};

export default ReportAvgCard;
