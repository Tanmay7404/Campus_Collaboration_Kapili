import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ReactPlayer from 'react-player';


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
  const [playing, setPlaying] = useState(false);

  const handleTogglePlay = () => {
    setPlaying(!playing);
  };
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
        // console.log(image),
        
<div className="swiper-wrapper">
  <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>                        
    {image.link.toLowerCase().includes('video') ? (
      <ReactPlayer
        url={image.link}
        controls={true}
        loop={true}
        autoPlay={playing}
        onClick={handleTogglePlay}
        className="swiperImg"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      /> 
    ) : (
      <img src={image.link} alt={`Slide ${index}`} className="swiperImg" style={{ maxWidth: '100%', maxHeight: '100%' }} />
    )}           
  </SwiperSlide>
</div>

      ))}
      <div class="swiper-button-next next"></div>
      <div class="swiper-button-prev"></div>
    </Swiper>
  );
};

export default DemoSwiper;