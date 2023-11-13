interface PropsType {
    content: string;
}

const TodayTip = ({ content }: PropsType) => {
    return (
        <div className="text-AppBody2 font-bold">
            <span className="text-pink font-bold">TIP. </span>
            {content}
        </div>
    )
}

export default TodayTip;