interface PropsType {
    title: string;
    img: string;
    content: string;
}

const CardAvgTap = ({ title, img, content }: PropsType) => {
    return (
        <>
            <div className="p-3 rounded-2xl bg-gray-100 shadow-md">
                <div className="w-24 h-24 flex flex-col items-center justify-center">
                    <p className="text-base font-bold">{title}</p>
                    <img className="w-16 inline-block" src={`${img}`} />
                    <p className="text-center text-base font-bold">{content}</p>
                </div>
            </div>
        </>
    )
}

export default CardAvgTap;