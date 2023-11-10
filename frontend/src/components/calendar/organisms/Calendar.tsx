import React, { 
    useEffect, 
    useState, 
    Dispatch, 
    SetStateAction } from 'react';

import { 
    format, 
    addMonths, 
    subMonths, 
} from 'date-fns';

import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

import RenderCells from '../molecules/RenderCell';
import { authInstance } from '../../../api/api';

interface CalendarProps {
    state?: number;
    setShowSelectedImg?: Dispatch<SetStateAction<string>>;
    setClothesId?: Dispatch<SetStateAction<number>>;
    setIsLikedOutFit?: Dispatch<SetStateAction<number>>;
    handleModalOpen? : () => void;
}

interface ClendarDataType {
    calendarList: {
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
        if (handleModalOpen) {
            handleModalOpen();
        }
    };
    
    
    // 날짜에 어떤 옷과 좋아요가 등록되어 있는지 리스트 불러오기 list값에 저장한 뒤 날짜 컴포넌트에 뿌려주자
    // 1. request에 curDate를 담아서 보내자

    const [calendarDataList, setCalendarDataList] = useState<ClendarDataType>();

    // 달력 데이터 가져오기
    const getCalendarData = async () => {
        try {
            const axiosInstance = authInstance({ ContentType: 'application/json' });
            const response = await axiosInstance.post('/calendars/list', {
                "regDate": format(selectedDate, 'yyyy-MM-dd').toString()
            });

            console.log('캘린더 목록 조회 성공', response.data.data)
            setCalendarDataList(response.data.data)
        } catch (error) {
            console.log('캘린더 목록 조회 실패', error)
        }
    };

    useEffect(() => {
        getCalendarData();
        // selectedData의 월이 바뀔 때만 호출해야된다
    }, [selectedDate])

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
                {calendarDataList !== undefined && (
                    <RenderCells
                        currentMonth={currentMonth}
                        selectedDate={selectedDate}
                        onDateClick={onDateClick}
                        state={state}
                        CalendarDataList={calendarDataList}
                        setShowSelectedImg={setShowSelectedImg}
                        setClothesId={setClothesId}
                        setIsLikedOutFit={setIsLikedOutFit}
                    />
                )}
            </div>
        </>
    );
};

export default Calendar;