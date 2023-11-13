import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// 이미지 임포트
import tutorialImageFirst from '../assets/images/tutorial/recommend.png';
import friendsCloset from '../assets/images/tutorial/friends-closet.png';
import scoreMyOutfit from '../assets/images/tutorial/pickpick.png';
import myCloset from '../assets/images/tutorial/my-closet.png';
import analysis from '../assets/images/tutorial/analysis.png';

const TutorialPage = () => {
  const navigate = useNavigate();
  const [currentSlideClass, setCurrentSlideClass] = useState('');

  const goMainPage = () => {
    navigate('/main');
  };

  const handleSlideChange = swiper => {
    const currentSlide = swiper.slides[swiper.activeIndex];

    setCurrentSlideClass(currentSlide.className);
  };

  return (
    <div className="h-[full]]">
      <div className="mb-[40px]"></div>
      <div className="h-[500px]">
        <Swiper
          className="mb-[90px]"
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={100}
          navigation
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={handleSlideChange}>
          <SwiperSlide>
            <div className="">
              <img src={myCloset} className="w-full h-[500px]" alt="Tutorial First"></img>
            </div>
            <div className="text-center mt-[30px]">내 옷장을 모으또에 등록하세요!</div>
            <div className="mt-[50px]"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <img src={tutorialImageFirst} className="w-full h-[500px]" alt="Tutorial Weather"></img>
            </div>
            <div className="text-center mt-[30px]">내 옷장에서 날씨에 맞는 옷을 추천해줍니다.</div>
            <div className="mt-[50px]"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <img src={scoreMyOutfit} className="w-full h-[500px]" alt="Score My Outfit"></img>
            </div>
            <div className="text-center mt-[30px]">오늘 입을 옷이 적절한지 평가해보세요!</div>
            <div className="mt-[50px]"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="">
              <img src={friendsCloset} className="h-[500px] w-full" alt="Friends Closet"></img>
            </div>
            <div className="text-center mt-[30px]">친구의 옷장을 구경하고 댓글을 달아보세요.</div>
            <div className="mt-[50px]"></div>
          </SwiperSlide>
          <SwiperSlide className="lastPage">
            <div className="">
              <img src={analysis} className="h-[500px] w-full" alt="Friends Closet Last"></img>
            </div>
            <div className="text-center mt-[30px]">모으또가 여러분들의 옷장을 분석해줍니다.</div>
            <div className="mt-[50px]"></div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex justify-center mt-[150px]">
        <button
          onClick={goMainPage}
          className="bg-pink-hot rounded-xl shadow-xl text-white text-WebBody3 p-4 tracking-wider font-bold">
          {currentSlideClass.includes('lastPage') ? '시작하기' : '건너뛰기'}
        </button>
      </div>
    </div>
  );
};

export default TutorialPage;
