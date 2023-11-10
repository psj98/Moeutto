import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PiSmileyBold, PiSmileySadBold } from 'react-icons/pi';
import { BsSnow, BsPencil } from 'react-icons/bs';
import { FaRegSun } from 'react-icons/fa';

import CalendarTemplates from '../components/calendar/templates/CalendarTemplates';


const CalendarPage = () => {
    // 선택한 날의 착장 상태
    // 이미지
    const [showSelectedImg, setShowSelectedImg] = useState<string>("");
    const [clothesId, setClothesId] = useState<number>(0);

    // 착장 평가
    const [isLikedOutFit, setIsLikedOutFit] = useState<number>(0);

    // 착장 상세 페이지 모달
    const [modalVisible, setModalVisible] = useState(false);

    // 착장 평가 페이지 모달
    const [isOpenedScoreModal, setIsOpenedScoreModal] = useState<boolean>(false);

    // 착장 평가 추워요/더워요 모달
    const [isColdModal, setIsColdModal] = useState<boolean>(false);

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
    }
  
    // 2번째 모달 열기
    const handleSecondModalOpen = () => {
      setIsColdModal(true);
    };

    // 제출하기
    const onHandleSubmitScore = (number: number): void => {
      setIsOpenedScoreModal(!isOpenedScoreModal);
      // 싫어요 누른 경우
      if (number === 2) {
        setIsColdModal(false);
      }
    }

  
  return (
    <>
      <button>
        {/* 달력 오늘 날짜에도 넣어놨습니다 (포스트 안된 경우만 뜸) */}
        <Link to="post">포스트</Link>
        <br />
      </button>
      <div className='flex flex-col justify-center items-center border rounded-2xl shadow-md border-pink border-2 p-4 shadow-md relative mt-6'>
        <CalendarTemplates
          setShowSelectedImg={setShowSelectedImg}
          setClothesId={setClothesId}
          setIsLikedOutFit={setIsLikedOutFit}
          handleModalOpen={handleModalOpen}
        />
        <div className='flex gap-2 ms-[20%]'>
          <BsPencil size={15} className='text-gray-dark' /> 
          <div className='font-gray-dark text-AppBody2'>
            착장 기록은 있지만 평가는 없어요
          </div>
        </div>
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
            onClick={firstModalOpen}
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
        >
          <div
            className='flex flex-col items-center justify-center bg-white border-4 border-pink shadow-md rounded-2xl p-4 w-3/4 h-1/4 max-w-[350px] min-h-[250px]'
          >
            <div className='-mt-[20px]'>착장에 대한 평가를 해주세요</div>
            <div className='flex gap-10 justify-center items-center mt-[20px]'>
              <PiSmileyBold onClick={() => onHandleSubmitScore(1)} size={80} color='#FAA0BF' className='hover:scale-105' />
              <PiSmileySadBold onClick={handleSecondModalOpen} size={80} color='#FAA0BF' className='hover:scale-105' />
            </div>
          </div>
      </div>
      )}

      {/* 두번째 평가 모달 */}
      {isColdModal && (
        <div
        className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-400 bg-opacity-30'
        >
          <div
            className='flex flex-col items-center justify-center bg-white border-4 border-pink shadow-md rounded-2xl p-4 w-3/4 h-1/4 max-w-[350px] min-h-[250px]'
          >
            <div className='-mt-[20px]'>착장에 대한 평가를 해주세요</div>
            <div className='flex gap-10 justify-center items-center mt-[20px]'>
              <FaRegSun onClick={() => onHandleSubmitScore(2)} size={70} color={"red"} className='hover:scale-105' />
              <BsSnow onClick={() => onHandleSubmitScore(2)} size={70} color={"blue"} className='hover:scale-105' />
            </div>
          </div>
      </div>
      )}
    </>
  );
};

export default CalendarPage;