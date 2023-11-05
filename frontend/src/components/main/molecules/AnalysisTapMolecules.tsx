import AnalysisCategory from "../atoms/AnalysisCategory";

const AnalysisCategoryMolecules = () => {
    const analysisCategories = [
        { width: 2, title: "rainbow", comment: "내 옷장의 색깔은?", link: "color" },
        { width: 4, title: "tree", comment: "내 옷장의 계절은?", link: "season" },
        { width: 4, title: "box", comment: "내 옷장의 크기는?", link: "volume" },
        { width: 4, title: "pig", comment: "내 옷장의 가치는?", link: "costs" },
        { width: 2, title: "earth", comment: "내 옷장의 활용도는?", link: "usability" },
        { width: 4, title: "uniform", comment: "내 옷장의 활용도는?", link: "frequency" }
      ];

    return (
        <>
        <div className="flex flex-wrap">
            {analysisCategories.map((item, index) => (
                <AnalysisCategory width={item.width} title={item.title} comment={item.comment} link={item.link} />
            ))}
        </div>
        </>
    )
}

export default AnalysisCategoryMolecules;