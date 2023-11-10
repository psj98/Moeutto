import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { 
    format, 
    addMonths, 
    subMonths, 
} from 'date-fns';

import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

import RenderCells from '../molecules/RenderCell';

interface CalendarProps {
    state?: number;
    setShowSelectedImg?: Dispatch<SetStateAction<string>>;
    setClothesId?: Dispatch<SetStateAction<number>>;
    setIsLikedOutFit?: Dispatch<SetStateAction<number>>;
    handleModalOpen?: any;
}

interface ClendarDataType {
    myOutFit: {
        id: number;
        imageUrl: string;
        likeOutfit: number;
        regDate: string;
    }[];
}

const Calendar = ({ 
    state, 
    setShowSelectedImg,
    setClothesId,
    setIsLikedOutFit,
    handleModalOpen
 }: CalendarProps) => {
    // 요일 구성
    const days = [];
    const date = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div key={i}>
                {date[i]}
            </div>,
        );
    }  

    // 이번 달 선택한 날짜 구분
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
        // 날짜를 클릭하면 모달이 열립니다
        handleModalOpen();
    };
    
    
    // 날짜에 어떤 옷과 좋아요가 등록되어 있는지 리스트 불러오기 list값에 저장한 뒤 날짜 컴포넌트에 뿌려주자
    // 1. request에 curDate를 담아서 보내자 (이건 오늘 보내야함)
    useEffect(() => {
        console.log('*************************', format(selectedDate, 'yyyy-MM-dd'));
    }, [selectedDate])

    // 가상의 데이터
    const CalendarDataList: ClendarDataType = 
    {
        "myOutFit": [
            {
                "id" : 1, // 착장 id
                "imageUrl" : "/images/clothes1.png", // 이미지
                "likeOutfit" : 1, // 좋아요 여부
                "regDate": '2023-11-01', // 착장 등록 날짜
            },
            {
                "id" : 2, // 착장 id
                "imageUrl" : "/images/clothes2.png", // 이미지
                "likeOutfit" : 2, // 좋아요 여부
                "regDate": '2023-11-02', // 착장 등록 날짜
            },
            {
                "id" : 3, // 착장 id
                "imageUrl" : "/images/clothes3.png", // 이미지
                "likeOutfit" : 3, // 좋아요 여부
                "regDate": '2023-11-03', // 착장 등록 날짜
            },
            {
                "id" : 4, // 착장 id
                "imageUrl" : "/images/clothes1.png", // 이미지
                "likeOutfit" : 1, // 좋아요 여부
                "regDate": '2023-11-04', // 착장 등록 날짜
            },
            {
                "id" : 5, // 착장 id
                "imageUrl" : "/images/clothes1.png", // 이미지
                "likeOutfit" : 2, // 좋아요 여부
                "regDate": '2023-11-05', // 착장 등록 날짜
            },
            {
                "id" : 6, // 착장 id
                "imageUrl" : "/images/clothes1.png", // 이미지
                "likeOutfit" : null, // 좋아요 여부
                "regDate": '2023-11-06', // 착장 등록 날짜
            },
            // {
            //     "id" : 6, // 착장 id
            //     "imageUrl" : "/images/clothes1.png", // 이미지
            //     "likeOutfit" : 3, // 좋아요 여부
            //     "regDate": '2023-11-10', // 착장 등록 날짜
            // },
        ],
    }


    return (
        <>
            <div className="pb-4">
                <div className='absolute -top-6 left-1/2 transform -translate-x-1/2'>
                {/* 헤더 월, 달 이동 */}
                <div className="">
                    <div className="flex gap-4">
                        <BiSolidLeftArrow onClick={prevMonth} size={50} color='#FAA0BF' />
                        <div className="flex items-center justify-center bg-pink rounded-[30px] w-[100px] text-white font-bold text-AppBody1">
                            {format(currentMonth, 'M')} 월
                        </div>
                        <BiSolidRightArrow onClick={nextMonth} size={50} color='#FAA0BF' />
                    </div>
                </div>
                </div>

                {/* 요일 */}
                <div className='mt-6'>
                    <div className="flex gap-6 justify-center">{days}</div>
                </div>

                {/* 날짜 */}
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                    state={state}
                    CalendarDataList={CalendarDataList}
                    setShowSelectedImg={setShowSelectedImg}
                    setClothesId={setClothesId}
                    setIsLikedOutFit={setIsLikedOutFit}
                />
            </div>
        </>
    );
};

export default Calendar;