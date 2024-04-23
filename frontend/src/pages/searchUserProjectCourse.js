import React from 'react';
import CourseCardList from '../components/coursecard/coursecardlist'; // Import your CourseCard component
//import CardList from '../components/ExplorePage/cardlist';// Import your ProjectCard component
import CardListu from '../components/searchuser/cardlist';  // Import your UserCard component
// import Explore from './explore';
import Exploreu from './searchuserwithoutswiper';

const DisplayContent = ({ contentType }) => {
  if (contentType === 'user') {
    return <CardListu />;
  } else if (contentType === 'course') {
    return <CourseCardList />;
  } else if (contentType === 'project') {
    return <Exploreu />;
  } else {
    return <div>No content to display.</div>;
  }
}

export default DisplayContent;
