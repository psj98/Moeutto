interface ReportFrequencyDonationProps {
  marginRight?: string;
  subTitle: string;
  storeName: string;
  storeLink: string;
}

const ReportFrequencyDonation = ({ marginRight, subTitle, storeName, storeLink }: ReportFrequencyDonationProps) => {
  return (
    <>
      <a
        href={storeLink}
        className={`${marginRight} flex flex-col items-center justify-center px-3 pt-4 pb-3 text-center rounded-3xl bg-[#FFFFFF] bg-opacity-80 hover:bg-pink whitespace-break-spaces`}>
        <p className="mb-1 text-xs text-[#878787]">{subTitle}</p>
        <div className="flex flex-row justify-center items-center">
          <p className="text-sm font-bold mr-2">{storeName}</p>
          <div>
            <img className="inline" src="/images/arrow-up-right.png" />
          </div>
        </div>
      </a>
    </>
  );
};

export default ReportFrequencyDonation;
