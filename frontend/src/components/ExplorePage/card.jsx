import React, { useState,useEffect } from "react";
import likeImg from "../../assets/images/like.svg";
import starImg from "../../assets/images/star.svg"
import clk from "../../assets/images/clock.png"
import open from"../../assets/images/collab.jpg"
import comp from "../../assets/images/completed.jpeg"
import { Tooltip } from 'bootstrap';
import unstarsss from "../../assets/images/project-planning-header@2x.png";

import { useSearchParams } from "react-router-dom";

import "./card.css";
// import Modal from 'react-modal';

import CardExpanded from "./CardExpanded";
import ReactDOM from 'react-dom';

const Card = ({details,setongoingData,setcompletedData,setcourseData,check}) =>{
    console.log(check)
    // console.log('lafda')
    // console.log(details.projectInfo?details.projectInfo.projectLink:details.courseInfo.courseLink)

    const [modalOpen, setModalOpen] = useState(false);

    let [searchParams, setSearchParams] = useSearchParams();
    let [query, setQuery] = useState(
     searchParams.get("name")
   );
   useEffect(()=>
{
console.log(161,query,1661)
if(details.name===query||details.title===query)
{
setModalOpen(true)
}
},[])


    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
      }, []);
    const difficultyOptions = [
        { label: 'Easy', value: 'easy', color: 'green' },
        { label: 'Medium', value: 'medium', color: 'orange' },
        { label: 'Hard', value: 'hard', color: 'red' },
      ];

    const openModal = () => {setModalOpen(true)
        console.log(901,details,901)
        if(details.name!=undefined){
    setSearchParams({name:details.name})}else
    {
        setSearchParams({name:details.title})
    }
    };
    const closeModal = () => {setModalOpen(false);
        console.log(90,details,90)

    setSearchParams({name:null})
    }

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
                    likes = {details.endorsements} 
                    ratings = {Number(details.rating).toFixed(1)} 
                    modalImage = {details.projectImage?details.projectImage.url:details.courseImage.url}
                    modalText = {details.title} 
                    projectname={details.name}
                    additionalImages = {details.projectInfo?details.projectInfo.demoLinks:details.courseInfo.demoLinks} 
                    aboutProjectText = {details.projectInfo?details.projectInfo.description:details.courseInfo.description} 
                    feedbackArray = {details.feedbacks}
                    open={details.openForCollaboration}
                    completed={details.ongoing}
                    projectlinks={details.projectInfo?details.projectInfo.projectLink:details.courseInfo.courseLink}
                    createdate={details.createdAt}
                    finishdate={details.completedAt}
                    level={details.level}
                    creator={details.creators}
                    _id={details._id}
                    closeModal={closeModal}
                    modalOpen={modalOpen}
                    setongoingData={setongoingData}
                    setcompletedData={setcompletedData}
                    setcourseData={setcourseData}
                    likedUsers={details.likedUsers}
                    chatId={details.chat}
                    check={check}
                />
            </div>
        </div>
    );  
    return (
       
        <div id="f" className="" style={{ margin: "0px 0px", overflow: 'visible', display: 'flex',flexDirection: 'column' }} onClick={()=>{openModal()
        }}>
       
            <div style={{ display: 'flex' }} className="profimg">
                {/* {details.creators.map((image, idx) => (
                    <img id="sp-profile"
                        key={idx}
                        src={image.profilePic}
                        // alt={`Image ${idx}`}
                        style={{
                            position: 'relative',
                            left: `${-1 * idx}px`, // Adjust the overlap amount here
                            zIndex: idx, // Increase z-index to make sure images overlap correctly
                            marginRight: '-10px' // Adjust the spacing between images here
                        }}
                    />
         
                ))} */}


    
            </div>
            <div className="projpic" style={{ position: 'relative' }}>
    <img src={details.projectImage?details.projectImage.url:details.courseImage.url} className="sw-img" alt="" />

    <div style={{ position: 'absolute', bottom: '10px', right: '15px',zIndex:1000 }}>
        {difficultyOptions.map((option) => (
            details.level === option.value && (
                <div
                    key={option.value}
                    className={`btn m-2 ${details.level === option.value ? 'btn-' + option.color : 'btn-outline-' + option.color}`}
                    style={{
                        borderRadius: '20px',
                        borderColor: option.color,
                        color: '#fff',
                        cursor: 'pointer',
                        backgroundColor: option.color,
                        padding: '5px 10px', // Decrease padding to reduce button size
                        fontSize: '14px',
                    }}
                >
                    {option.label}
                </div>
            )
        ))}
    </div>
</div>



            <div className="sw-details">
                <div className="sw-details-1">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{fontSize:'1.5rem'}}>{details.name?details.name:details.title}</div>
                       
                            <div>      
                            <i 
                            className="bi bi-arrow-down-circle icon-hover-effect"
                            data-bs-toggle="tooltip" 
                            data-bs-placement="top" 
                            title="More info">
                            </i>

                            
                            </div> 
                    </div>
                    <p>{details.name?details.title:''}</p>
                </div>
                <div className="sw-details-2">

                    <div id="tags1">
                    {details.tags.slice(0, 3).map((tag, idx) => {
                    return (
                        <a href="#" id={tag.name} className="tags1" key={idx} style={{ borderColor: tag.color, color: tag.color }}>{tag.name}</a>
                    );
                    })}
                    {details.tags.length > 3 && <span>  </span>}
                    </div>

                    <div id="wait">
                        <div>
                            <div style={{width:'16px'}}>
                                <img src={likeImg} alt=""/>
                            </div> <span>{details.endorsements}</span></div>
                        <div><div style={{width:'16px'}}><img src={starImg} alt=""/></div> <span>{Number(details.rating).toFixed(1)}</span></div>
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
//

export default Card;