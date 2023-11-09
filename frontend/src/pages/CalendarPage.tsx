import { Link } from 'react-router-dom';
import { useState } from 'react';
import CalendarTemplates from '../components/calendar/templates/CalendarTemplates';

const CalendarPage = () => {
    // 선택한 날의 착장 이미지 상태입니다
    const [showSelectedImg, setShowSelectedImg] = useState<string>("");
    const [clothesId, setClothesId] = useState<number>();
    const [isLikedOutFit, setIsLikedOutFit] = useState<number>();
  
  return (
    <>
      <button>
        <Link to="post">포스트</Link>
        <br />
      </button>
      <div className='flex justify-center items-center border rounded-2xl shadow-md border-pink border-2 p-4 shadow-md relative'>
        <CalendarTemplates
          setShowSelectedImg={setShowSelectedImg}
          setClothesId={setClothesId}
          setIsLikedOutFit={setIsLikedOutFit}
        />
      </div>
      <div>
        착장 상세 페이지 모달이요
        <img src={showSelectedImg} alt="" />
        옷 아이디: {clothesId}
        좋아요 상태: {isLikedOutFit}
      </div>
    </>
  );
};

export default CalendarPage;