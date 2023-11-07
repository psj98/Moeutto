interface ReportFrequencyCardProps {
  divColor: string;
  clothesImage: string;
}

const ReportFrequencyCard = ({ divColor, clothesImage }: ReportFrequencyCardProps) => {
  return (
    <>
      <div className={`p-3 mb-3 rounded-3xl bg-[${divColor}] shadow-[1px_4px_4px_0px_rgba(0,0,0,0.15)]`}>
        <img className="w-20" src={clothesImage} alt="옷 이미지" />
      </div>
    </>
  );
};

export default ReportFrequencyCard;
