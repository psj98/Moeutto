interface PropsType {
    title: string;
    index: number;
    oneCount: number;
    price: number;
    brand: string;
}

const LabelContent = ({ title, index, oneCount, price, brand }: PropsType) => {
    return (
        <div className={`text-AppBody1 font-bold ${index === 3 ? 'h-[35px]' : ''} ${oneCount >= 3 && index === 1 ? 'h-[75px]' : ''}`}>
            {!(index === 5 && price === 0) && !(index === 6 && brand === '') && title}
        </div>
    )
}

export default LabelContent;