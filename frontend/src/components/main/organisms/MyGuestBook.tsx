import { Dispatch, useEffect, SetStateAction, useState } from "react";
import { authInstance } from "../../../api/api";

interface MyGuestBookProps {
    setIsAlertModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface GuestBook {
    nickname: string;
    post: string;
    regDate: string;
}

const MyGuestBook = ({ setIsAlertModalOpen }: MyGuestBookProps) => {
    const [myGuestBookData, setMyGuestBookData] = useState<GuestBook[]>();

    // 나의 방명록 api 가져오기
    const getGuestBookData = async () => {
        try {
            const axiosInstance = authInstance({ ContentType: 'application/json' });
            const response = await axiosInstance.get('/guestbooks');

            console.log('방명록 목록 조회 성공', response.data.data)
            setMyGuestBookData(response.data.data)
        } catch (error) {
            console.log('방명록 목록 조회 실패', error)
        }
    };

    useEffect(() => {
        getGuestBookData();
    }, [])

    const closeAlert = () => {
        setIsAlertModalOpen(prev => !prev)
    }

    return (
        <>
        <div className="absolute z-99 h-[300px] w-4/5 rounded-2xl left-1/2 top-[230px] transform -translate-x-1/2 -translate-y-1/2 bg-pink">
            <div className="flex">
                <div className="flex justify-start font-bold text-AppTitle2 text-white p-4">나의 방명록</div>
                <div className="flex items-center ms-[35%] font-bold text-white" onClick={closeAlert}>X</div>
            </div>
            <div className="bg-white rounded-2xl w-[80%] justify-center items-center mx-auto mb-6">
                {myGuestBookData ? (
                    <>
                         <div className="h-[70%] overflow-auto p-4">
                            {myGuestBookData
                                .slice(0)
                                .reverse() // 댓글 최신순이 가장 먼저 오기 위해서 역정렬을 한다
                                .map((item, index) => {
                                const Date = item.regDate.split('-');

                                return (
                                    <div key={index} className="text-AppBody2 flex justify-between">
                                    <div className="w-[50px]">
                                        {Date[1]}-{Date[2]}
                                    </div>
                                    {item.post}
                                    <div className="w-[80px] overflow-hidden text-right">{item.nickname}</div>
                                    </div>
                                );
                                })}
                        </div>
                    </>
                ) : (
                    <div>아직 방명록을 남긴 친구가 없네요 ㅜㅅㅜ</div>
                )}

            </div>
        </div>
        </>
    )
}

export default MyGuestBook;