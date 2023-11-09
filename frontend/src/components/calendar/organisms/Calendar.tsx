import React, { useState } from 'react';
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

// 몇 월인지, 이전달/다음달 이동하기
const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="">
            <div className="flex gap-4">
                <BiSolidLeftArrow onClick={prevMonth} size={50} color='#FAA0BF' />
                <div className="flex items-center justify-center bg-pink rounded-[30px] w-[100px] text-white font-bold text-AppBody1">
                    {format(currentMonth, 'M')} 월
                </div>
                <BiSolidRightArrow onClick={nextMonth} size={50} color='#FAA0BF' />
            </div>
        </div>
    );
};

// 요일 렌더링
const RenderDays = () => {
    const days = [];
    const date = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="flex gap-6 justify-center">{days}</div>;
};

// 날짜 렌더링
const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    // const today = new Date(); // 현재 날짜 가져오기

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
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

            // if (isSameDay(day, today)) { // 오늘 날짜인 경우
            //     cellClass += 'today';
            // }

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
                    className={`min-w-[42px] min-h-[42px] bg-gray-button rounded-lg p-1 shadow-md ${backgroundColor}`}
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
                        {formattedDate}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="flex" key={format(day, 'yyyyMMdd')}>
                {days}
            </div>,
        );
        days = [];
    }

    return <div>{rows}</div>;
};

// 컴포넌트 모아서 달력 구성하기
const Calendar = () => {
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

    return (
        <>
            <div className="pb-4">
                <div className='absolute -top-6 left-1/2 transform -translate-x-1/2'>
                    <RenderHeader
                        currentMonth={currentMonth}
                        prevMonth={prevMonth}
                        nextMonth={nextMonth}
                    />
                </div>
                <div className='mt-6'>
                    <RenderDays />
                </div>
                <RenderCells
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    onDateClick={onDateClick}
                />
            </div>
        </>
    );
};

export default Calendar;