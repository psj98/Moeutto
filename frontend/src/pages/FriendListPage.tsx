import { useState, useEffect } from 'react';
import FriendListTemplate from '../components/friend/templates/FriendListTemplate';
import { authInstance } from '../api/api';
/* {
	"friendList": [
		{
			"email": String, // 사용자 정보 email
			"nickname": String // 사용자 닉네임
			"profileImage": String // 사용자 프로필
		}, ...
	]
} */

export interface FriendType {
  email: string;
  nickname: string;
  profileImage: string;
  isFollowing?: number;
}

export interface FriendListType {
  friendList: FriendType[];
}

const FriendListPage = () => {
  const [search, setSearch] = useState<string>(''); // 검색 단어
  const [data, setData] = useState<FriendType[] | null>(null); // 친구 목록 데이터

  // 진입시 내 친구 목록 조회 api 날리기
  const getMyFriends = async () => {
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.get('/friends/list');

      return response.data;
    } catch (error) {
      throw new Error('나의 친구 목록 데이터 조회 실패');
    }
  };

  useEffect(() => {
    getMyFriends().then(res => {
      setData(res.data);
    });
  }, []);

  // 검색시 친구 조회 api 날리기
  const SearchData = async () => {
    try {
      // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = await axiosInstance.post('/friends/search', { nickname: search });

      setData(response.data.data);
      return response.data;
    } catch (error) {
      throw new Error('나의 친구 검색 데이터 조회 실패');
    }
  };

  useEffect(() => {
    // if (search) {
    //   SearchData().then(res => {
    //     setData(res.data);
    //   });
    // } else {
    //   getMyFriends().then(res => {
    //     setData(res.data);
    //   });
    if (search === '') {
      // 검색어 비어있으면 내 친구 목록 가져오기
      getMyFriends().then(res => {
        setData(res.data);
      });
    }
  }, [search]);

  return (
    <div>
      <div className="m-5">친구 옷장을 구경할 수 있어요</div>
      <FriendListTemplate seachAction={SearchData} friendList={data} value={search} setValue={setSearch} />
    </div>
  );
};

export default FriendListPage;
