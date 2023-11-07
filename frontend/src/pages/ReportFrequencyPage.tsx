import IntroComment from '../components/report/atoms/IntroComment';
import ShortReportComment from '../components/report/atoms/ShortReportComment';
import ReportComment from '../components/report/atoms/ReportComment';
import ReportFrequency from '../components/report/atoms/ReportFrequency';
import ReportFrequencyDonation from '../components/report/atoms/ReportFrequencyDonation';

const frequencyMaxList = [
  {
    divColor: '#FFCFE0',
    clothesImage: '/images/clothes2.png',
    frequencyAmount: 30,
  },
  {
    divColor: '#FFEAF6',
    clothesImage: '/images/clothes3.png',
    frequencyAmount: 20,
  },
  {
    divColor: '#FFFFFF',
    clothesImage: '/images/clothes4.png',
    frequencyAmount: 10,
  },
];

const frequencyMinList = [
  {
    divColor: '#FFFFFF',
    clothesImage: '/images/clothes4.png',
    frequencyAmount: 0,
  },
  {
    divColor: '#FFEAF6',
    clothesImage: '/images/clothes3.png',
    frequencyAmount: 2,
  },
  {
    divColor: '#FFCFE0',
    clothesImage: '/images/clothes1.png',
    frequencyAmount: 3,
  },
];

const ReportFrequencyPage = () => {
  return (
    <>
      {/* 인트로 분석 문구 */}
      <IntroComment nickname="모드리치" imageUrl="/images/report.png" />

      {/* 간단 분석 문구 */}
      <ShortReportComment
        imageDivClass="absolute top-[-35px] left-[10px]"
        imageUrl="/images/earth.png"
        imageClass="w-20 inline-block"
        mainTitle="당신은 지구지킴이?"
        subTitle="6개월을 기준으로 계산해봤어요"
      />

      {/* 많이 입은 옷 */}
      <div className="mb-4">
        <ReportComment
          divPadding=""
          imageUrl="/images/report-happy.png"
          imageClass="w-24 inline-block"
          mainTitle="가장 많이 입는 옷은 무엇일까요?"
          subTitle={`가장 많이 입은 횟수는 무려 30회`}
        />
      </div>

      {/* 많이 입은 옷 분석 문구 */}
      <ReportFrequency
        frequencyList={frequencyMaxList}
        frequencyComment={`OO을 자주 입으시는군요\n다음에는 OO을 구매해보세요`}
      />

      {/* 적게 입은 옷 */}
      <div className="mb-4">
        <ReportComment
          imageUrl="/images/report-sad.png"
          imageClass="w-24 inline-block"
          mainTitle="가장 적게 입는 옷은 무엇일까요?"
          subTitle={`가장 적게 입은 횟수는 무려 0회`}
        />
      </div>

      {/* 적게 입은 옷 분석 문구 */}
      <ReportFrequency frequencyList={frequencyMinList} frequencyComment={`옷을 사보는 건 어떨까요?`} />

      <div className="flex flex-col mx-2 mb-6 px-6 py-8 bg-[#DFDFDF] bg-opacity-40 rounded-2xl">
        <p className="mb-8 text-left text-lg font-bold whitespace-pre-wrap">{`옷장에서 잠자는 옷을\n기부해보는 건 어떠세요?`}</p>
        <div className="grid grid-cols-2 gap-4">
          <ReportFrequencyDonation
            marginRight="mr-1"
            subTitle="국내외 소외이웃을 돕는"
            storeName="아름다운 가게"
            storeLink="https://www.beautifulstore.org/"
          />
          <ReportFrequencyDonation
            subTitle="취준생에게 대여해주는"
            storeName="열린 옷장"
            storeLink="https://theopencloset.net/"
          />
          <ReportFrequencyDonation
            marginRight="mr-1"
            subTitle="옷 양이 많아서 부담된다면"
            storeName="옷캔"
            storeLink="https://otcan.org/"
          />
          <ReportFrequencyDonation
            subTitle="장애인의 선한일터"
            storeName="굿윌 스토어"
            storeLink="https://www.goodwillstore.org/"
          />
        </div>
      </div>
    </>
  );
};

export default ReportFrequencyPage;
