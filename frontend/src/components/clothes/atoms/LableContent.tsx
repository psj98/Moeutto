interface PropsType {
    title: string;
    index: number;
}

const LabelContent = ({ title, index }: PropsType) => {
    return (
        <div className={`text-WebBody2 font-bold ${index === 3 ? 'h-[35px]' : ''}`}>{title}</div>
    )
}

export default LabelContent;