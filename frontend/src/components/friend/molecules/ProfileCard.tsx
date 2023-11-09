import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authInstance } from '../../../api/api';
import { FriendType } from '../../../pages/FriendListPage';

const ProfileCard = ({ nickname, email, profileImage, isFollowing }: FriendType) => {
  const [isFollow, setIsFollow] = useState<number>(isFollowing);

  const handleFollow = () => {
    const PostFollow = async () => {
      try {
        // 토큰이 필요한 api의 경우 authInstance를 가져옵니다
        const axiosInstance = authInstance({ ContentType: 'application/json' });
        const response = await axiosInstance.post('/friends/follow', {
          email,
        });

        return response;
      } catch (error) {
        console.log(error);
        throw new Error('팔로우 팔로잉 실패');
      }
    };

    PostFollow().then(() => {
      if (isFollow === 0) {
        setIsFollow(1);
      } else {
        setIsFollow(0);
      }
    });
  };

  return (
    <ul>
      <li className="py-3 sm:py-4 sm:px-3 border rounded-md m-3">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full object-cover" src={profileImage} alt="image" />
          </div>
          <div className="flex-1 min-w-0">
            <Link to={email}>
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{nickname}</p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">{email}</p>
            </Link>
          </div>
          <button
            className={
              isFollow === 0
                ? 'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                : 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
            }
            onClick={handleFollow}
            type="button">
            {isFollow === 0 ? '팔로우' : '팔로잉'}
          </button>
        </div>
      </li>
    </ul>
  );
};

export default ProfileCard;
