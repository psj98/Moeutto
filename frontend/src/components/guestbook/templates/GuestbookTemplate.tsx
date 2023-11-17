import React, { Dispatch, SetStateAction } from 'react';
import { GuestBookListType } from '../../../pages/FriendClosetPage';

export interface GuestbookPropsTypes {
  value: string;
  setValue: Dispatch<SetStateAction<string>>; // PropType는 필요한 타입으로 대체해야 합니다.
  onClick: () => void;
  posts: GuestBookListType[];
}

const GuestbookTemplate = ({ value, setValue, onClick, posts }: GuestbookPropsTypes) => {
  return (
    <div>
      <div className="w-full h-[220px] rounded-lg mb-3 bg-pink p-5">
        <div className="flex justify-between h-[30%] mb-3">
          <input
            className="rounded-lg w-[75%] h-[40px] shadow-md px-3"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="방명록을 작성해보세요"
          />
          <button
            type="button"
            className="w-[20%] bg-pink-hot rounded-lg h-[40px] text-white text-AppBody2 shadow-md"
            onClick={onClick}>
            작성하기
          </button>
        </div>
        <div className="h-[70%] overflow-auto">
          {posts
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
      </div>
    </div>
  );
};

export default GuestbookTemplate;
