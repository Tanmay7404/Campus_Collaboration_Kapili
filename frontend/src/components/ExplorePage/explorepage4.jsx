import React from 'react';
//import CardListwithoutswiper from './cardlist.jsx';
import "./explorepage4.css";
import CardListwithouswiper from './cardlistwithoutswiper.jsx';

const ExplorePg4 = (props) => {
    console.log(props);
    return (
        <div id ="page4">
            {props.allGroups.map((dataItem, index) => (
                <CardListwithouswiper key={index} data={dataItem} setModalOpen = {props.setModalOpen} setongoingData={props.setongoingData} setcompletedData={props.setcompletedData} likedproj={props.likedproj} setlikedproj={props.setlikedproj}/>
            ))}
        </div>
    );
};
  
export default ExplorePg4;