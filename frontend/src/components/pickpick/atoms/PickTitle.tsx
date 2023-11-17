import { useState, useEffect } from 'react';
import { authInstance } from '../../../api/api';

const PickTitle = () => {
  const pathname = window.location.pathname;

  const name: string = window.sessionStorage.getItem('nickname');
  const [nickname, setNickname] = useState<string>(name);

  useEffect(() => {
    if (pathname.split('/').length > 2) {
      if (pathname === '/calendar/post') {
        setNickname('나');
      }
      const email = pathname.split('/')[3]; // ['', 'notmycloset', 'friend', 'email']

      const fetchData = async () => {
        try {
          // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
          const axiosInstance = authInstance({ ContentType: 'application/json' });
          const response = await axiosInstance.post('/members/find-nickname', {
            email, // 친구 email
          });

          if (response.data.data) {
            setNickname(response.data.data);
          } else {
            console.log(response);
          }
          return response.data;
        } catch (error) {
          throw new Error('친구 닉네임 조회 실패');
        }
      };

      fetchData();
    } else {
      setNickname('나');
    }
  }, []);

  return (
    <div className="">
      <div className="p-4 text-AppTitle1 font-bold">
        <div>{nickname ? `${nickname}의 옷장` : '옷장 로딩 중...'}</div>
      </div>
    </div>
  );
};

export default PickTitle;
