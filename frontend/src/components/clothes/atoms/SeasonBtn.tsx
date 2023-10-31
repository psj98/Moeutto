interface PropsType {
    season: string;
}

const SeasonBtn = ({ season }: PropsType) => {
    const seasonMap: { [key: string]: string } = {
        '봄': '#FFECEC',
        '여름': '#6BFF10',
        '가을': '#83D2F4',
        '겨울': '#FEE1FF'
    };

    const seasonList: { name: string; color: string }[] = [];

    if (season.length === 4) {
        // 2진법에서 봄, 가을 가져오기 ex) 1010
        const selectedSeasons = ['봄', '여름', '가을', '겨울'].filter((_, index) => season[index] === '1');

        // 계절에 맞는 색상 가져오기
        for (const selectedSeason of selectedSeasons) {
            seasonList.push({ name: selectedSeason, color: seasonMap[selectedSeason] });
        }
    }

    return (
        <div className="flex gap-4">
            {seasonList.map((item, index) => (
                <div key={index} className="text-WebBody2 rounded-2xl w-[8vw] flex justify-center items-center shadow-md"
                    style={{ backgroundColor: `${item.color}50` }}
                >{item.name}</div>
            ))}
        </div>
    )
};

export default SeasonBtn;