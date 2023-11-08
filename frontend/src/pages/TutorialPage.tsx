// import React, { useRef } from 'react';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import tutorialImageFirst from '../assets/images/tutoral_1.png';

const TutorialPage = () => {
  return (
    <div className="swiper-container">
      <div className="title flex justify-center">튜토리얼</div>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={50}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className={`
       `}>
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

        <SwiperSlide>
          <div>
            <img src={tutorialImageFirst} className="w-full h-auto object-cover"></img>
          </div>
        </SwiperSlide>
      </Swiper>
      <div></div>
    </div>
  );
};

export default TutorialPage;
