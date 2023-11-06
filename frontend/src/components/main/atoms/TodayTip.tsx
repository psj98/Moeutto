interface PropsType {
    content: string;
}

const TodayTip = ({ content }: PropsType) => {
    return (
        <div className="text-AppBody2 font-bold">{content}</div>
    )
}

export default TodayTip;