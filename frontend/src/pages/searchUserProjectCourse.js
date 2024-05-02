import React from 'react';
import CourseCardList from '../components/coursecard/coursecardlist'; // Import your CourseCard component
// import CardList from '../components/ExplorePage/cardlist';// Import your ProjectCard component
import CardListu from '../components/searchuser/cardlist';  // Import your UserCard component
// import Explore from './explore';
import Exploreu from './searchuserwithoutswiper';
// import Explore from './explore';

const DisplayContent = ({ contentType,searchInput,selectedTags,searchTrigger }) => {
  return (
    <>
      <div id="layer0"></div>
      <div id="layer1"></div>
      <div id="layer2"></div>
      <div id="layer3"></div>
      <div id="wholepage"></div>
      {(contentType === 'Users')?<CardListu  searchInput={searchInput} selectedTags={selectedTags} searchTrigger={searchTrigger}/>:null}
      {(contentType === 'Courses')? <CourseCardList searchInput={searchInput} selectedTags={selectedTags} searchTrigger={searchTrigger}/>: null}
      {(contentType === 'Projects')? <Exploreu searchInput={searchInput} selectedTags={selectedTags} searchTrigger={searchTrigger}/>: null}

  </>
  
);
}

export default DisplayContent;
