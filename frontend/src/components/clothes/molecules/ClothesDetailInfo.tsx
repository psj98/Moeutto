import LabelContent from "../atoms/LableContent";
import Content from "../atoms/Content";

interface PropsType {
    labelList: string[];
    contentList: (string | number)[];
}

const ClothesDetailInfo = ({ labelList, contentList }: PropsType) => {
    return (
        <div className="flex">
            <div className="space-y-[4vh] flex flex-col items-end me-[5vw] w-[65px]">
                {labelList.map((title, index) => (
                    <LabelContent title={title} index={index} />
                ) )}
            </div>
            <div className="space-y-[4vh] flex flex-col">
                {contentList.map((content, index) => (
                    <Content content={content} id={index} />
                ))}
            </div>
        </div>
    )
}

export default ClothesDetailInfo;