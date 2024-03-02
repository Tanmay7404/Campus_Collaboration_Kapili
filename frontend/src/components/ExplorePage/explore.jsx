import React from 'react';
import ExplorePg1 from './explorePage1.jsx';
import ExplorePg2 from './explorePage2.jsx';
import "./explore.css";
import ExplorePg3 from './explorePage3.jsx';
import CardExpanded from './CardExpanded.jsx';
import {useState} from 'react';

const Explore = (props) => {
    const [modaldata, setModalOpen] = useState(null);
    return (
    <>
      <ExplorePg1 />
      <ExplorePg2 />
      <ExplorePg3 allGroups={props.data.allGroups} setModalOpen = {setModalOpen}/>
    </>
    );
  };
  
export default Explore;