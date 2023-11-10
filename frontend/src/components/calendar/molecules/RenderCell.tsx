import React, { useEffect, Dispatch, SetStateAction  } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    format, 
    startOfMonth, 
    endOfMonth, 
    startOfWeek, 
    endOfWeek, 
    isSameMonth, 
    isSameDay, 
    addDays, 
    parse 
} from 'date-fns';

import { FaPlus } from 'react-icons/fa';


interface RenderCellsProps {
    currentMonth: Date;
    selectedDate: Date;
    onDateClick: (day: Date) => void;
    state?: number;
    CalendarDataList: CalendarDataType; 
    setShowSelectedImg: Dispatch<SetStateAction<string>>;
    setClothesId: Dispatch<SetStateAction<number>>;
    setIsLikedOutFit: Dispatch<SetStateAction<number>>;
}

interface CalendarDataType {
    myOutFit: OutfitData[];  
}

interface OutfitData {
    id: number;       
    imageUrl: string; 
    likeOutfit: number;  
    regDate: string; 
}

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
}: RenderCellsProps) => {

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
        if (setClothesId) {
            setClothesId(0);
            setIsLikedOutFit(5);
        }

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

            const onDateCellClick = () => {
                if (location.pathname === '/calendar') {
                    onDateClick(parse(format(cloneDay, 'yyyy-MM-dd'), 'yyyy-MM-dd', new Date()));
                }
            };
            
            days.push(
                <div
                    className={`
                    ${state === 1 ? 'w-[40px] h-[40px]' : 'w-[50px] h-[50px]'}
                    min-w-[42px] min-h-[42px] bg-gray-button rounded-lg p-1 pt-0 shadow-md ${backgroundColor} relative`}
                    key={key} 
                    onClick={onDateCellClick}
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

export default RenderCells;