import React from 'react';
import CardList from './cardlist.jsx';

const ExplorePg3 = (props) => {
    console.log(props);
    return (
        <div id ="page3">
            {props.allGroups.map((dataItem, index) => (
                <CardList key={index} data={dataItem} setModalOpen = {props.setModalOpen} />
            ))}
        </div>
    );
};
  
export default ExplorePg3;