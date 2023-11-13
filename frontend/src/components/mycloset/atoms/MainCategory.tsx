interface PropsType {
    title: string;
}

const MainCategory = ({ title }: PropsType ) => {
    return (
        <>
            <div>{title}</div>
        </>
    )
}

export default MainCategory;