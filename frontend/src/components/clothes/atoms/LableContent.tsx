interface PropsType {
    title: string;
    index: number;
    oneCount: number;
}

const LabelContent = ({ title, index, oneCount }: PropsType) => {
    return (
        <div className={`text-AppBody1 font-bold ${index === 3 ? 'h-[35px]' : ''} ${oneCount >= 3 && index === 1 ? 'h-[75px]' : ''}`}>{title}</div>
    )
}

export default LabelContent;