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

    // 전체 내용 보여주기
    const [expandedPost, setExpandedPost] = useState(null);

    const handlePostClick = (index) => {
        if (expandedPost === index) {
            setExpandedPost(null);
        } else {
            setExpandedPost(index);
        }
    };

    return (
        <>
        <div className="absolute z-99 min-h-[150px] max-h-[600px] shadow-md w-5/6 rounded-2xl left-1/2 top-[290px] transform -translate-x-1/2 -translate-y-1/2 bg-pink">
            <div className="flex">
                <div className="flex justify-start font-bold text-AppTitle2 text-white p-4">나의 방명록</div>
                <div className="flex items-center ms-[35%] font-bold text-white" onClick={closeAlert}>X</div>
            </div>
            <div className="bg-white overflow-auto p-4 pt-6 flex rounded-2xl w-[90%] min-h-[100px] max-h-[500px] justify-center items-center mx-auto mb-6">
                {myGuestBookData ? (
                    <>
                         <div className="h-full overflow-auto">
                            {myGuestBookData
                                .slice(0)
                                .reverse() // 댓글 최신순이 가장 먼저 오기 위해서 역정렬을 한다
                                .map((item, index) => {
                                const Date = item.regDate.split('-');
                                const postContent = item.post;
                                const isLongText = postContent.length > 8;
                                const truncatedText = isLongText ? `${postContent.substring(0, 8)}...` : postContent;

                                return (
                                    <div key={index} className="text-AppBody2 flex justify-between">
                                    <div className="w-[50px]">
                                        {Date[1]}-{Date[2]}
                                    </div>
                                    <div
                                        onClick={() => handlePostClick(index)}
                                        className=""
                                    >
                                        {expandedPost === index ? item.post : truncatedText}
                                    </div>
                                    <div className="w-[80px] overflow-hidden text-right">{item.nickname}</div>
                                    </div>
                                );
                                })}
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center text-center my-auto">아직 방명록을 남긴 <br/> 친구가 없네요 ㅜㅅㅜ</div>
                )}

            </div>
        </div>
        </>
    )
}

export default MyGuestBook;