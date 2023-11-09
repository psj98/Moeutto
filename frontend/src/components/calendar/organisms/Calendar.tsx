import React, { useEffect, useState } from 'react';
import { 
    format, 
    addMonths, 
    subMonths, 
    startOfMonth, 
    endOfMonth, 
    startOfWeek, 
    endOfWeek, 
    isSameMonth, 
    isSameDay, 
    addDays, 
    parse 
} from 'date-fns';

import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';


// 날짜 렌더링
const RenderCells = ({ currentMonth, selectedDate, onDateClick, state, CalendarDataList }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    // const today = new Date(); // 현재 날짜 가져오기

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    console.log('나의 달력 데이터', CalendarDataList);

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            // 달력에 표시할 날짜 형식
            formattedDate = format(day, 'd');
            
            // 그 날짜에 어떤 이모지가 달릴지 결정할 날짜 형식
            const todayDate = format(day, 'yyyy-MM-dd');

            // 오늘 날짜에 맞는 이미지를 가져온다
            if (CalendarDataList  && Array.isArray(CalendarDataList.myOutFit)) {
                CalendarDataList.myOutFit.forEach(outfit => {
                    if (outfit.regDate === todayDate) {
                        const likeOutfit = outfit.likeOutfit;

                        console.log(todayDate, '의 상태는', likeOutfit);
                    }
                });
            }

            // 상태에 따라 표시할 이모지 변경하기


            const cloneDay = day;
            const key = format(day, 'yyyyMMdd'); // Convert the Date to a string format to be used as a key

            let cellClass = '';

            if (!isSameMonth(day, monthStart)) {
                // 이번 달이 아닌 날짜
                cellClass += 'disabled';
            } else if (isSameDay(day, selectedDate)) {
                // 선택한 날짜
                cellClass += 'selected';
            }

            // 배경색 다르게 주기
            let backgroundColor = '';

                if (cellClass === 'selected') {
                    backgroundColor = 'bg-pink text-white';
                    console.log('지금 선택한 날짜는: ', selectedDate);
                } else if (cellClass === 'disabled') {
                    backgroundColor = 'bg-white';
                // } else if (cellClass === 'today') {
                //     backgroundColor = 'border-2 border-pink-hot'
                } else {
                    backgroundColor = 'bg-gray-button';
                } 
            
            days.push(
                <div
                    className={`
                    ${state === 1 ? 'w-[42px] h-[42px]' : 'w-[50px] h-[50px]'}
                    min-w-[42px] min-h-[42px] bg-gray-button rounded-lg p-1 pt-0 shadow-md ${backgroundColor} relative`}
                    key={key} 
                    onClick={() => onDateClick(parse(format(cloneDay, 'yyyy-MM-dd'), 'yyyy-MM-dd', new Date()))}
                >
                    <span
                        className={`
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                            text-[10px]
                            `
                        }
                    >
                        {/* 날짜 출력 */}
                        {formattedDate}

                        {/* 날짜 조건에 맞는 이모지 출력 */}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }
        // 마지막 열의 날짜인 경우
        rows.push(
            <div className="flex" key={format(day, 'yyyyMMdd')}>
                {days}
            </div>,
        );
        days = [];
    }

    return <div>{rows}</div>;
};

interface CalendarProps {
    state?: number;
}

interface ClendarDataType {
    myOutFit: {
        id: number;
        imageUrl: string;
        likeOutfit: number;
        regDate: string;
    }[];
}

const Calendar = ({ state }: CalendarProps) => {
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
    };

    // YYYY-MM-DD 형식 맞춰주기
    const year = currentMonth.getFullYear();
    const month = (currentMonth.getMonth() + 1).toString().padStart(2, '0'); // 0부터 시작해서 2자리 숫자로 변환
    const day = currentMonth.getDate().toString().padStart(2, '0');

    // request 에 이 날짜를 담으면 된다
    const formattedDate = `${year}-${month}-${day}`;

    // 날짜에 어떤 옷과 좋아요가 등록되어 있는지 리스트 불러오기 list값에 저장한 뒤 날짜 컴포넌트에 뿌려주자
    // 1. request에 curDate를 담아서 보내자
    useEffect(() => {
        console.log('지금 선택한 날짜는? : 2023-11-11 형식으로 ..', formattedDate);
    }, [formattedDate])


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
                "imageUrl" : "/images/clothes1.png", // 이미지
                "likeOutfit" : 2, // 좋아요 여부
                "regDate": '2023-11-02', // 착장 등록 날짜
            },
            {
                "id" : 3, // 착장 id
                "imageUrl" : "/images/clothes1.png", // 이미지
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
                "likeOutfit" : 3, // 좋아요 여부
                "regDate": '2023-11-06', // 착장 등록 날짜
            },
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
                />
            </div>
        </>
    );
};

export default Calendar;