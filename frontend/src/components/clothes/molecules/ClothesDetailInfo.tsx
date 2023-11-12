import LabelContent from "../atoms/LableContent";
import Content from "../atoms/Content";

interface PropsType {
    labelList: string[];
    // contentList: (string | number)[];
    contentList: any;
}

const ClothesDetailInfo = ({ labelList, contentList }: PropsType) => {
    // const oneCount = contentList[1].filter(char => char === '1').length;
    
    // console.log(oneCount)
    const oneCount: number = 3;

    return (
        <div className="flex">
            <div className="space-y-8 flex flex-col items-end me-10 w-[120px]">
                {labelList.map((title, index) => (
                    <LabelContent title={title} index={index} oneCount={oneCount}  />
                ) )}
            </div>
            <div className="space-y-8 flex flex-col">
                {contentList.map((content, index) => (
                    <Content content={content} id={index} />
                ))}
            </div>
        </div>
    )
}

export default ClothesDetailInfo;