import React, { useContext, useEffect } from 'react';
import { useParams,Navigate } from 'react-router-dom';
import UserContext from '../userContext';
const RedirectToOtherPage = () => {
  const {setCurrUser} = useContext(UserContext);
  const {username} = useParams();
  useEffect(() => {
    // Call your function here
    redirectToOtherPage();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const redirectToOtherPage = () => {
    const decodedUsername = decodeURIComponent(username);
    setCurrUser(decodedUsername);
  };

  // Return null to render nothing
  return <Navigate to="/explore"/>;
};

export default RedirectToOtherPage;