import ReportAvgCard from './ReportAvgCard';

interface ReportAvgProps {
  imageUrl: string;
  imageAlt: string;
  myClosetTitle: string;
  myClosetValue: string;
  avgClosetTitle: string;
  avgClosetValue: string;
}

const ReportAvg = ({
  imageUrl,
  imageAlt,
  myClosetTitle,
  myClosetValue,
  avgClosetTitle,
  avgClosetValue,
}: ReportAvgProps) => {
  return (
    <>
      <div className="flex flex-row justify-evenly mb-10">
        <ReportAvgCard
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          closetTitle={myClosetTitle}
          closetValue={myClosetValue}
        />
        <ReportAvgCard
          imageUrl={imageUrl}
          imageAlt={imageAlt}
          closetTitle={avgClosetTitle}
          closetValue={avgClosetValue}
        />
      </div>
    </>
  );
};

export default ReportAvg;
