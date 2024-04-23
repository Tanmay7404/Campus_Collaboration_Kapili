import React from 'react';
//import CardListwithoutswiper from './cardlist.jsx';
import "./explorepage4.css";
import CardListwithouswiper from './cardlistwithoutswiper.jsx';

const ExplorePg4 = (props) => {
    return (
        <div id ="page3">
            {props.allGroups.map((dataItem, index) => (
                <CardList key={index} data={dataItem} setModalOpen = {props.setModalOpen} setongoingData={props.setongoingData} setcompletedData={props.setcompletedData}  />
            ))}
        </div>
    );
};

  
export default ExplorePg4;