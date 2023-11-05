import AnalysisCategory from "../atoms/AnalysisCategory";

const AnalysisCategoryMolecules = () => {
    return (
        <>
        <div className="flex flex-wrap">
            <AnalysisCategory width={2} title="rainbow" comment="내 옷장의 계절은?" link="season" />
            <AnalysisCategory width={4} title="rainbow" comment="내 옷장의 계절은?" link="season" />
            <AnalysisCategory width={4} title="rainbow" comment="내 옷장의 계절은?" link="season" />
            <AnalysisCategory width={4} title="rainbow" comment="내 옷장의 가치는?" link="season" />
            <AnalysisCategory width={2} title="rainbow" comment="내 옷장의 계절은?" link="season" />
            <AnalysisCategory width={4} title="rainbow" comment="내 옷장의 계절은?" link="season" />
        </div>
        </>
    )
}

export default AnalysisCategoryMolecules;