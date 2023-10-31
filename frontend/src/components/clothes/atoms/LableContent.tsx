interface PropsType {
    title: string
}

const LabelContent = ({ title }: PropsType) => {
    return (
        <div className="text-WebBody2 font-bold">{title}</div>
    )
}

export default LabelContent;