import React, { useState } from "react";
import likeImg from "../../assets/images/like.svg";
import starImg from "../../assets/images/star.svg"
// import Modal from 'react-modal';

import CardExpanded from "./CardExpanded";
import ReactDOM from 'react-dom';

const Card = ({details}) =>{
    
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const modalContent = (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1050,
        }} onClick={closeModal}>
            <div style={{
                scale: '1',
                opacity: '1',
                backgroundColor: '#0000005d',
                position: 'fixed',
                zIndex: '100',
                height: '100vh',
                width: '100vw',
                top: 0,
                left: 0,
                overflow: 'scroll',
            }} onClick={e => e.stopPropagation()}>
                <CardExpanded 
                    tags = {details.tags}
                    likes = {details.likes} 
                    ratings = {details.ratings} 
                    modalImage = {details.projectImage} 
                    modalText = {details.projectTitle} 
                    contactImage = {details.profileImage} 
                    contactName = {details.userName} 
                    additionalImages = {details.additionalImages} 
                    aboutProjectText = {details.aboutProjectText} 
                    feedbackArray = {details.feedbackArray}
                    closeModal={closeModal}
                />
            </div>
        </div>
    );
    return (
        <div>
        <div className="swiper-slide swiper-slide1" onClick={openModal}>
            <img src = {details.profileImage} id="sp-profile" alt=""/>
            <img src= {details.projectImage} className="sw-img" alt=""/>
            <div className="sw-details">
                <div className="sw-details-1">
                    <h3>{details.projectTitle}</h3>
                    <p>{details.userName}</p>
                </div>
                <div className="sw-details-2">
                    <div id="tags1">
                        {details.tags.map((tag,idx)=>{
                            return(
                            <a href="#" id={tag.name} className="tags1" key={idx} style={{borderColor: tag.color, color: tag.color}} >{tag.name}</a>
                            );
                        })}

                    </div>
                    <div id="wait">
                        <div><div><img src={likeImg} alt=""/></div> <span>{details.likes}</span></div>
                        <div><div><img src={starImg} alt=""/></div> <span>{details.ratings}</span></div>
                    </div>
                </div>
            </div>
        </div>
        {modalOpen && ReactDOM.createPortal(
            modalContent,
            document.getElementById('modal-root')
        )}
        
        </div>
    );
}

export default Card;