import { useEffect, useState } from "react";
import RecommenedFeed from "../molecules/RecommendedFeed";
import { authInstance } from "../../../api/api";


const RecommendedFeedList = () => {
    const [recommendFeedListData, setRecommendFeedListData] = useState<any>();

    const getFriendsRecommendList = async () => {
        try {
            const axiosInstance = authInstance({ ContentType: 'application/json' });
            const response = await axiosInstance.get('friend-outfits');
        
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
          {recommendFeedListData?.length > 0 ? (
            recommendFeedListData?.map((item, index) => (
              <RecommenedFeed
                key={index}
                index={index}
                date={item.regDate}
                nickname={item.recommenderNickname}
                clothesList={item.clothesList}
                comment={item.comment}
              />
            ))
          ) : (
            <div className="flex justify-center">
              <div className="flex justify-center">아직 추천 받은 옷이 없어요 😢</div>
            </div>
          )}
        </>
      );
    };
    
    export default RecommendedFeedList;