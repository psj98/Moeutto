import MainComment from '../atoms/MainComment';
// import AnalysisCategoryMolecules from "../molecules/AnalysisTapMolecules";
import AnalysisCardTap from '../molecules/AnalysisCardTap';

const AnalysisTap = () => {
  const userName: string = `${sessionStorage.getItem('nickname')}`;

  return (
    <>
      <div className="mt-6 mb-4">
        <div className="mb-4 bg-[#FFD8E5] p-4 rounded-2xl shadow-md">
          <MainComment title={`${userName}님의 \n옷장을 분석해봤어요`} />
        </div>
        {/* <AnalysisCategoryMolecules /> */}
        <AnalysisCardTap
          title={`당신은 혹시 무지개 \n인간인가요?`}
          img={'/images/rainbow.png'}
          comment="옷장의 색상 분포도를 알려줄게요"
          link={'/mycloset/report/color'}
          state={1}
        />
        <AnalysisCardTap
          title={`당신은 \n지구지킴이?`}
          img={'/images/earth.png'}
          comment="6개월동안 가장많이 입은 옷을 알려줄게요"
          link={'/mycloset/report/frequency'}
          state={2}
        />
        <AnalysisCardTap
          title={`지갑은 \n괜찮아요?`}
          img={'/images/wallet.png'}
          comment={`옷장의 가치를 알려줄게요`}
          subComment="모으또 평균 유저와 비교해보세요"
          link={'/mycloset/report/costs'}
          state={3}
        />
        <AnalysisCardTap
          title={`집이 넓어요?`}
          img={'/images/box.png'}
          comment={`옷장의 크기를 알려줄게요`}
          subComment="모으또 평균 유저와 비교해보세요"
          link={'/mycloset/report/volume'}
          state={4}
        />
        <AnalysisCardTap
          title={`스폰지밥인가요?`}
          img={'/images/uniform.png'}
          comment={`옷장 활용도를 알려줄게요`}
          subComment="활용하지 못하는 카테고리를 확인해보세요"
          link={'/mycloset/report/usability'}
          state={5}
        />
        <AnalysisCardTap
          title={`당신의 옷장은 \n어떤 계절일까요?`}
          img={'/images/tree.png'}
          comment={`계절별 옷 분포를 알려줄게요`}
          subComment="어느 계절의 옷이 가장 많은지 확인해보세요"
          link={'/mycloset/report/season'}
          state={6}
        />
      </div>
    </>
  );
};

export default AnalysisTap;
