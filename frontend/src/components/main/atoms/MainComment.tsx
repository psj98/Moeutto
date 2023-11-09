interface PropsType {
    title: string
}

const MainComment = ({ title }: PropsType) => {
    return (
        <div className="text-AppBody1 font-bold whitespace-pre-wrap">{title}</div>
    )
}

export default MainComment;