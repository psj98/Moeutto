import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import tutorialImageFirst from '../assets/images/tutoral_1.png';

const TutorialPage = () => {
  return (
    <div className="tutorial-container">
      <div className="title flex justify-center">튜토리얼</div>
      <Swiper
        pagination={true}
        className={`
      w-auto object-cover h-screen md:w-[30rem] md:h-[1000px] lg:w-[61rem] my-6 max-w-[500px] md:max-w- auto object-cover max-h-screen 
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