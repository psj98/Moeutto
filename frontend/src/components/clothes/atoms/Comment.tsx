import { useState, useEffect } from "react";

interface propsType {
    frequency: number;
    recentDate: string;
    name: string;
}

const Comment = ({ frequency, recentDate, name }: propsType) => {
    // 몇일 전인지 구하기
    const [daysPassed, setDaysPassed] = useState<number | null>(null);

    useEffect(() => {
        // 주어진 날짜와 현재 날짜 계산
        const calculateDaysPassed = () => {
            // 백에서 어떤 형식으로 줄 지는 모르겠음
            const givenDate = new Date('2023-10-20');
            const currentDate = new Date();
            
            // 주어진 날짜와 현재 날짜의 차이를 계산 (밀리초 단위)
            const difference = currentDate.getTime() - givenDate.getTime();
            
            // 밀리초를 일로 변환 (1일 = 24시간 * 60분 * 60초 * 1000밀리초)
            const days = Math.floor(difference / (24 * 60 * 60 * 1000));

            setDaysPassed(days);
        };

        calculateDaysPassed();
    }, []);

    return (
        <>
            <div className="text-WebBody2 tracking-wider">
                <span className="text-deepblack font-bold">{name}</span>
                <span className="text-gray-dark">을 총 </span>
                <span className="text-pink-hot font-bold">{frequency}</span>
                <span className="text-gray-dark">번 입었어요</span>
            </div>
            <div className="text-WebBody2 tracking-wider">
                <span className="text-deepblack font-bold">{name}</span>
                <span className="text-gray-dark">을 </span>
                <span className="text-pink-hot font-bold">{daysPassed}</span>
                <span className="text-gray-dark">일 전에 입었어요</span>
            </div>
        </>
    )
}

export default Comment;