import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Card from './card.jsx';
import "./cardlist.css";
// import coursedata from '../coursecard/coursedata.js';
import Coursecard from '../coursecard/coursecard.js';


const CardList = ({data,setModalOpen,setongoingData,setcompletedData,setcourseData}) => {

  const [direction, setDirection] = useState(getDirection());
  // const[check,setCheck]=useState("explore");

  useEffect(() => {
    const handleResize = () => {
      setDirection(getDirection());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getDirection() {
    return window.innerWidth <= 760 ? 'vertical' : 'horizontal';
  }

  return (
    <>
        <h1 className="project-heading">{data.text}</h1>
        <div className="swiper swiper1 mySwiper">
            <div className="swiper-wrapper">
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={3}
                    direction={direction}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    onResize={() => setDirection(getDirection())}
                >
                
                {data.list_cards.map((card, index)=> {
                    return(
                        <div className="swiper-slide" key={index}>
                            <SwiperSlide key={index}>  
                              <Card key={index} details = {card} setModalOpen = {setModalOpen} setongoingData={setongoingData} setcompletedData={setcompletedData}  setcourseData={setcourseData} check={data.type} /> : 
                              
                            
                                        
                            </SwiperSlide>
                        </div>
                    );
                })}

        
                <div className="swiper-button-next next"></div>
                <div className="swiper-button-prev"></div>
                </Swiper>
            </div>
        </div>
    </>
  );
};


export default CardList;


