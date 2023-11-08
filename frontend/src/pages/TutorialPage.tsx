// import React, { useRef } from 'react';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import tutorialImageFirst from '../assets/images/tutoral_1.png';

const TutorialPage = () => {
  const naviagte = useNavigate();

  const goMainPage = () => {
    naviagte('/main');
  };

  return (
    <div className="h-[full]]">
      <div className="title flex justify-center">튜토리얼</div>
      <div className="h-[500px]">
        <Swiper
          className="mt-[125px] mb-[90px] "
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={100}
          navigation
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}>
          <SwiperSlide>
            <div className="">
              <img src={tutorialImageFirst} className="w-full h-auto object-cover"></img>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div>
              <img src={tutorialImageFirst} className="w-full h-auto object-cover"></img>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div>
              <img src={tutorialImageFirst} className="w-full h-auto object-cover"></img>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div>
              <img src={tutorialImageFirst} className="w-full h-auto object-cover"></img>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex justify-center ">
        <button
          onClick={goMainPage}
          className="bg-pink-hot rounded-xl shadow-xl text-white text-WebBody3 p-4 tracking-wider font-bold">
          건너뛰기
        </button>
      </div>
    </div>
  );
};

export default TutorialPage;
