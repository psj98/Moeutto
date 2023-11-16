import ReportFrequencyCard from './ReportFrequencyCard';
import ReportFrequencyAmount from './ReportFrequencyAmount';
import ReportFrequencyComment from './ReportFrequencyComment';

interface ReportFrequencyObject {
  divColor: string;
  clothesImage: string;
  frequencyAmount: number;
}

interface ReportFrequencyProps {
  frequencyList: ReportFrequencyObject[];
  frequencyComment: string;
}

const ReportFrequency = ({ frequencyList, frequencyComment }: ReportFrequencyProps) => {
  console.log(frequencyList);

  return (
    <>
      <div className="flex flex-col p-2 mb-8">
        <div className="flex flex-row justify-evenly mb-8 px-4 py-3 rounded-2xl bg-[#D7D7D7] bg-opacity-40">
          {frequencyList.map((item, index) => (
            <>
              <div className="flex flex-col justify-center">
                <ReportFrequencyCard divColor={item.divColor} clothesImage={item.clothesImage} />
                <ReportFrequencyAmount frequencyAmount={item.frequencyAmount} />
              </div>
            </>
          ))}
        </div>
        <ReportFrequencyComment frequencyComment={frequencyComment} />
      </div>
    </>
  );
};

export default ReportFrequency;
