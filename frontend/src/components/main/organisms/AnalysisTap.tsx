import MainComment from "../atoms/MainComment";
import AnalysisCategoryMolecules from "../molecules/AnalysisTapMolecules";

const AnalysisTap = () => {
    return (
        <>
        <div className="mb-4">
            <div className="mb-4">
                <MainComment title={"내 옷장의 특징은 무엇일까요?"} />
            </div>
            <AnalysisCategoryMolecules />
        </div>
        </>
    )
}

export default AnalysisTap;