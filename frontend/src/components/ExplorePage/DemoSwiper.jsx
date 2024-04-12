import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const DemoSwiper = ({additionalImages}) => {


  const [direction, setDirection] = useState(getDirection());

  useEffect(() => {
    const handleResize = () => {
      setDirection(getDirection());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getDirection() {
    return window.innerWidth <= 760 ? 'vertical' : 'horizontal';
  }

  return (
    
    <Swiper
      modules={[Navigation]}
      slidesPerView={2}
      direction={direction}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      onResize={() => setDirection(getDirection())}
    >
      {additionalImages.map((image, index) => (
        
        <div className="swiper-wrapper">
          <SwiperSlide key={index}>                        
            <img src={image.link} alt={`Slide ${index}` } className="swiperImg"/>                   
          </SwiperSlide>
        </div>
      ))}
      <div class="swiper-button-next next"></div>
      <div class="swiper-button-prev"></div>
    </Swiper>
  );
};

export default DemoSwiper;