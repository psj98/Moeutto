import { useEffect, useState } from "react";
import RecommenedFeed from "../molecules/RecommendedFeed";
import { authInstance } from "../../../api/api";


const RecommendedFeedList = () => {
    const [recommendFeedListData, setRecommendFeedListData] = useState<any>();

    const getFriendsRecommendList = async () => {
        try {
            const axiosInstance = authInstance({ ContentType: 'application/json' });
            const response = await axiosInstance.get('friend-outfits');
        
            console.log(response.data.data)
            setRecommendFeedListData(response.data.data);
         
        } catch (error) {
            console.log('친구에게 옷 추천 받은 목록 조회 실패', error)
        }
    };

    useEffect(() => {
        getFriendsRecommendList();
    }, [])

    return (
        <>
            {recommendFeedListData?.map((item, index) => {
                return (
                    <RecommenedFeed 
                        key={index}
                        index={index}
                        date={item.regDate}
                        nickname={item.recommenderNickname}
                        clothesList={item.clothesList} 
                        comment={item.comment}
                    />
                )
            })}
        </>
    )
}

export default RecommendedFeedList;