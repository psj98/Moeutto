interface PropsType {
    title: string
}

const MainComment = ({ title }: PropsType) => {
    return (
        <div className="text-AppBody1 font-bold">{title}</div>
    )
}

export default MainComment;