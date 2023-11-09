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
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


// 날짜 렌더링
const RenderCells = ({ 
    currentMonth, 
    selectedDate, 
    onDateClick, 
    state, 
    CalendarDataList, 
    setShowSelectedImg,
    setClothesId,
    setIsLikedOutFit 
}) => {

    const navigate = useNavigate();

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    useEffect(() => {
        console.log('지금 선택한 날짜', format(selectedDate, 'yyyy-MM-dd'));
    }, [selectedDate])


    // 내가 클릭한 날의 착장을 알고 싶음
    useEffect(() => {

        // 발견하지 못한 경우 상태를 초기화 해서 상세페이지가 열리지 않게 합니다
        setClothesId(0);
        setIsLikedOutFit(5);

        // 내가 받은 리스트가 존재하고, 배열일 때
        if (CalendarDataList  && Array.isArray(CalendarDataList.myOutFit)) {
            // 반복문을 돌면서
            CalendarDataList.myOutFit.forEach(outfit => {
                // 만약에 선택한 날과 같은 값을 발견한다면
                if (format(selectedDate, 'yyyy-MM-dd') === outfit.regDate) {
                    // 이미지 상태를 업데이트 합니다
                    setShowSelectedImg(outfit.imageUrl);
                    // 착장의 id 상태를 업데이트 합니다
                    setClothesId(outfit.id);
                    // 착장의 평가 여부 및 평가 단계를 업데이트 합니다
                    setIsLikedOutFit(outfit.likeOutfit);
                }
            });
        }
    }, [selectedDate])    

    // 마지막 날까지 돌면서 달력의 날짜를 완성시킵니다
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            // 달력에 표시할 날짜 형식
            formattedDate = format(day, 'd');
            
            // 그 날짜에 어떤 이모지가 달릴지 결정할 날짜 형식
            const todayDate = format(day, 'yyyy-MM-dd');
            let likeOutfit: number = 0;

            // 이모지
            let imgUrl: string = "";
            
            // 오늘 날짜에 맞는 착장 이미지를 가져온다
            // 오늘 날짜에 맞는 이모지를 가져온다
            if (CalendarDataList  && Array.isArray(CalendarDataList.myOutFit)) {
                CalendarDataList.myOutFit.forEach(outfit => {

                    // 오늘과 등록한 날이 같은 경우 그 날의 이모지 상태를 알 수 있음
                    if (outfit.regDate === todayDate) {
                        likeOutfit = outfit.likeOutfit;
                    }

                });
            }

            // 상태에 따른 착장 평가 이모지
            if (likeOutfit === 1) {
                imgUrl = "/images/report-sad.png";
            } else if (likeOutfit === 2) {
                imgUrl = "/images/report-happy.png";
            } else if (likeOutfit === 3) {
                imgUrl = "/images/pig.png";
            }


            const cloneDay = day;
            const key = format(day, 'yyyyMMdd'); 

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
            } else if (cellClass === 'disabled') {
                backgroundColor = 'bg-white';
            } else {
                backgroundColor = 'bg-gray-button';
            } 
            
            days.push(
                <div
                    className={`
                    ${state === 1 ? 'w-[40px] h-[40px]' : 'w-[50px] h-[50px]'}
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
                        {imgUrl && (
                            <div className='absolute top-0'>
                                <img src={`${imgUrl}`} alt="sad" className='' />
                            </div>
                        )}

                        {/* 오늘 날짜에 착장을 추가하지 않았을 경우 + 아이콘 출력 */}
                        {!imgUrl && isSameDay(day, new Date()) && (
                            <div className="absolute top-2 left-2 text-pink-hot hover:scale-105 cursor-pointer"
                                onClick={() => navigate('/calendar/post') }
                            >
                                <FaPlus size={35} />
                            </div>
                        )}
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
    setShowSelectedImg?: any;
    setClothesId?: any;
    setIsLikedOutFit?: any;
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