import CategoryTap from "../molecules/CategoryTap";

const CategoryTapOrganism = () => {
    return (
        <>
            <CategoryTap title="상의" id="002000" categories={['전체', '반팔', '후드', '맨투맨']} uniqueId={1} />
            <CategoryTap title="하의" id="003000" categories={['전체', '청바지', '반바지', '카고팬츠']} uniqueId={2}  />
            <CategoryTap title="아우터" id="001000" categories={['전체', '패딩', '자켓', '코트']} uniqueId={3}  />
            <CategoryTap title="아이템" id="004000" categories={['전체', '귀마개', '장갑', '목도리']} uniqueId={4}  />
        </>
    )
}

export default CategoryTapOrganism;