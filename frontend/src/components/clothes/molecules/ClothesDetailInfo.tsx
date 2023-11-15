import LabelContent from "../atoms/LableContent";
import Content from "../atoms/Content";

interface PropsType {
    labelList: string[];
    // contentList: (string | number)[];
    contentList: any;
}

const ClothesDetailInfo = ({ labelList, contentList }: PropsType) => {
    const oneCount: number = (contentList[1].match(/1/g) || []).length;   
    
    return (
        <div className="flex">
            <div className="space-y-8 flex flex-col items-end me-10 w-[120px]">
                {labelList.map((title, index) => (
                    <LabelContent title={title} index={index} oneCount={oneCount} price={contentList[5]} brand={contentList[6]} />
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