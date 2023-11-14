import ClothesDetailInfo from "../molecules/ClothesDetailInfo";
import ClothesName from "../atoms/ClothesName";


interface PropsType {
    category: string;
    season: string;
    thickness: string;
    color: string;
    textile: string;
    price: number;
    shop: string;
    name: string;
}

const ClothesInfo = ({ category, season, thickness, color, textile, price, shop, name }: PropsType) => {
    const labelList: string[] = ["카테고리", "계절", "두께", "색상", "소재", "가격", "브랜드"];
    const contentList: (string | number)[] = [];

    // props로 받아서 list로 가공하기
    contentList.push(category, season, thickness, color, textile, price, shop);

    return (
        <div className="w-full flex flex-col items-center">
            <ClothesName name={name} />
            <ClothesDetailInfo labelList={labelList} contentList={contentList} />
        </div>
    )
}

export default ClothesInfo;