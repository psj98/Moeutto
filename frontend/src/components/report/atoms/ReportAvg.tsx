import ReportAvgCard from './ReportAvgCard';

interface ReportAvgProps {
  image: imageObject;
  myCloset: closetObject;
  avgCloset: closetObject;
}

interface imageObject {
  url: string;
  alt: string;
}

interface closetObject {
  title: string;
  value: string;
}

const ReportAvg = ({ image, myCloset, avgCloset }: ReportAvgProps) => {
  return (
    <>
      <div className="flex flex-row justify-evenly mb-10">
        <ReportAvgCard image={image} closet={myCloset} />
        <ReportAvgCard image={image} closet={avgCloset} />
      </div>
    </>
  );
};

export default ReportAvg;
