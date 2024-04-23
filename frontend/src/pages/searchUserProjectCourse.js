import React from 'react';
import CourseCardList from '../components/coursecard/coursecardlist'; // Import your CourseCard component
// import CardList from '../components/ExplorePage/cardlist';// Import your ProjectCard component
import CardListu from '../components/searchuser/cardlist';  // Import your UserCard component
// import Explore from './explore';
// import Exploreu from './searchuserwithoutswiper';
import Explore from './explore';

const DisplayContent = ({ contentType }) => {
  return (
    <>
      <div id="layer0"></div>
      <div id="layer1"></div>
      <div id="layer2"></div>
      <div id="layer3"></div>
      <div id="wholepage"></div>
      {(contentType === 'user')?<CardListu />:null}
      {(contentType === 'course')? <CourseCardList />: null}
      {(contentType === 'project')? <Explore/>: null}

  </>
  
);
}

export default DisplayContent;
