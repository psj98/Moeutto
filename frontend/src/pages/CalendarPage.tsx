import { useState } from 'react';
import { BsPencil } from 'react-icons/bs';

import CalendarTemplates from '../components/calendar/templates/CalendarTemplates';
import { authInstance } from '../api/api';

const CalendarPage = () => {
  // 선택한 날의 착장 상태
  // 이미지
  const [showSelectedImg, setShowSelectedImg] = useState<string>('');
  const [clothesId, setClothesId] = useState<number>(0);

  // 착장 평가
  const [isLikedOutFit, setIsLikedOutFit] = useState<number>(0);

  // 착장 상세 페이지 모달
  const [modalVisible, setModalVisible] = useState(false);

  // 착장 평가 페이지 모달
  const [isOpenedScoreModal, setIsOpenedScoreModal] = useState<boolean>(false);

  // 착장 평가 추워요/더워요 모달
  const [isColdModal, setIsColdModal] = useState<boolean>(false);

  // 착장 등록하면 캘린더 다시 불러오기 위한 state 값
  const [updateCalendar, setUpdateCalendar] = useState<boolean>(false);

  // 상세 페이지 모달 열기
  const handleModalClose = () => {
    setModalVisible(false);
  };

  // 상세 페이지 모달 닫기
  const handleModalOpen = () => {
    setModalVisible(true);
  };

  // 1번째 모달 열기
  const firstModalOpen = () => {
    setIsOpenedScoreModal(true);
  };

  // 2번째 모달 열기
  const handleSecondModalOpen = () => {
    setIsColdModal(true);
  };

  // 제출하기 호출 API
  const postScoreData = async (likeOutfit: number) => {
    try {
      const axiosInstance = authInstance({ ContentType: 'application/json' });
      const response = axiosInstance.put('/calendars/score', {
        id: clothesId,
        likeOutfit,
      });

      console.log('착장 평가 성공', response);
      console.log('옷 평가 완료', isLikedOutFit);

      setUpdateCalendar(!updateCalendar);
    } catch (error) {
      console.log('착장 평가 실패', error);
    }
  };

  // 제출하기
  const onHandleSubmitScore = (number: number): void => {
    console.log('1. 제출하기 버튼을 눌렀다');
    console.log('넘버는?', number);
    postScoreData(number);
    setIsOpenedScoreModal(!isOpenedScoreModal);
    // 싫어요 누른 경우
    if (number !== 1) {
      setIsColdModal(false);
    }
  };

  return (
    <>
      <div className="bg-white flex flex-col justify-center items-center border rounded-2xl shadow-md border-pink border-2 p-4 shadow-md relative mt-6">
        <CalendarTemplates
          setShowSelectedImg={setShowSelectedImg}
          setClothesId={setClothesId}
          setIsLikedOutFit={setIsLikedOutFit}
          handleModalOpen={handleModalOpen}
          updateCalendar={updateCalendar}
        />
        <div className="flex gap-2 ms-[20%]">
          <BsPencil size={15} className="text-gray-dark" />
          <div className="font-gray-dark text-AppBody2">착장 기록은 있지만 평가는 없어요</div>
        </div>
      </div>
      {/* 상세 정보 모달 */}
      {modalVisible && clothesId !== 0 && (
        <div className="bg-pink shadow-md rounded-2xl p-4 mt-6 mb-[80px]">
          <div className="flex justify-between">
            <button onClick={handleModalClose} className="bg-gray-button rounded-xl px-4 p-2 shadow-md text-pink">
              닫기
            </button>
            <button className="bg-pink-hot text-white px-4 p-2 rounded-xl shadow-md" onClick={firstModalOpen}>
              평가하기
            </button>
          </div>
          <div className="flex justify-center items-center p-6">
            <img src={showSelectedImg} alt="OutFit" className="w-[60%] h-1/2 bg-white rounded-xl " />
          </div>
        </div>
      )}
      {/* 평가 모달 */}
      {isOpenedScoreModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-400 bg-opacity-30">
          <div className="flex flex-col items-center justify-center bg-white border-4 border-pink shadow-md rounded-2xl p-4 w-3/4 h-1/4 max-w-[350px] min-h-[250px]">
            <div className="-mt-[20px]">착장에 대한 평가를 해주세요</div>
            <div className="flex gap-10 justify-center items-center mt-[20px]">
              <img
                src="/images/Good.png"
                alt="good"
                className="w-1/3 hover:scale-105"
                onClick={() => onHandleSubmitScore(1)}
              />
              <img src="/images/bad.png" alt="bad" className="w-1/3 hover:scale-105" onClick={handleSecondModalOpen} />
            </div>
          </div>
        </div>
      )}
      {/* 두번째 평가 모달 */}
      {isColdModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-400 bg-opacity-30">
          <div className="flex flex-col items-center justify-center bg-white border-4 border-pink shadow-md rounded-2xl p-4 w-3/4 h-1/4 max-w-[350px] min-h-[250px]">
            <div className="-mt-[20px]">착장에 대한 평가를 해주세요</div>
            <div className="flex gap-10 justify-center items-center mt-[20px]">
              <img
                src="/images/hot-face.png"
                alt="hot"
                className="hover:scale-105 w-1/3"
                onClick={() => onHandleSubmitScore(2)}
              />
              <img
                src="/images/cold.png"
                alt="cold"
                className="hover:scale-105 w-1/3"
                onClick={() => onHandleSubmitScore(3)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarPage;
