import { Link } from 'react-router-dom';
import { useState } from 'react';
import CalendarTemplates from '../components/calendar/templates/CalendarTemplates';

const CalendarPage = () => {
    // 선택한 날의 착장 상태
    // 이미지
    const [showSelectedImg, setShowSelectedImg] = useState<string>("");
    // 착장 아이디
    const [clothesId, setClothesId] = useState<number>();
    // 착장 펴가
    const [isLikedOutFit, setIsLikedOutFit] = useState<number>();

    // 착장 상세 페이지 모달
    const [modalVisible, setModalVisible] = useState(false);
    // 착장 평가 페이지 모달
    const [isOpenedScoreModal, setIsOpenedScoreModal] = useState<boolean>(false);

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleModalOpen = () => {
        setModalVisible(true);
    };

    const onHandleSubmitScore = () => {
      setIsOpenedScoreModal(!isOpenedScoreModal);

      // 평가 여부로 나누기
      // if (clothesId !== 0) {
      //   alert(`이미 ${isLikedOutFit}으로 평가를 완료 했어요`)
      // } else {
      //   setIsOpenedScoreModal(!isOpenedScoreModal);
      // }
    }
  
  return (
    <>
      <button>
        {/* 달력 오늘 날짜에도 넣어놨습니다 (포스트 안된 경우만 뜸) */}
        <Link to="post">포스트</Link>
        <br />
      </button>
      <div className='flex justify-center items-center border rounded-2xl shadow-md border-pink border-2 p-4 shadow-md relative mt-6'>
        <CalendarTemplates
          setShowSelectedImg={setShowSelectedImg}
          setClothesId={setClothesId}
          setIsLikedOutFit={setIsLikedOutFit}
          handleModalOpen={handleModalOpen}
        />
      </div>

      {/* 상세 정보 모달 */}
      {modalVisible && clothesId !== 0 && (
        <div
            className='bg-pink shadow-md rounded-2xl p-4 mt-6'
        >
          <div className='flex justify-between'>
            <button onClick={handleModalClose} className='bg-gray-button rounded-xl px-4 p-2 shadow-md text-pink'>닫기</button>
            <button 
            className='bg-pink-hot text-white px-4 p-2 rounded-xl shadow-md'
            onClick={onHandleSubmitScore}
            >평가하기</button>
          </div>
          <div className='flex justify-center items-center p-6'>
            <img src={showSelectedImg} alt="OutFit" className='w-[60%] h-1/2' />
          </div>
            {/* 이건 나중에 숨길거임 */}
            <div>
                옷 아이디: {clothesId}
                좋아요 상태: {isLikedOutFit}
            </div>
        </div>

      )}

      {/* 평가 모달 */}
      {isOpenedScoreModal && (
        <div
          className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-400 bg-opacity-30'
          onClick={onHandleSubmitScore}
        >
        <div
          className='bg-pink shadow-md rounded-2xl p-4 w-3/4 h-1/4'
        >
          <button onClick={onHandleSubmitScore} className='bg-pink-hot px-4 p-2 rounded-2xl shadow-md text-white'>제출하기</button>
        </div>
    </div>
      )}
    </>
  );
};

export default CalendarPage;