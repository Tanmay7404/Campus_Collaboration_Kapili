import React, { useContext, useEffect } from 'react';
import { useParams,Navigate } from 'react-router-dom';
const RedirectToOtherPage = () => {
  const {username} = useParams();
  useEffect(() => {
    // Call your function here
    redirectToOtherPage();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const redirectToOtherPage = () => {
    const decodedUsername = decodeURIComponent(username);
    localStorage.setItem('user',decodedUsername)
 //   setCurrUser(decodedUsername);

  };

  // Return null to render nothing
  return <Navigate to="/explore"/>;
};

export default RedirectToOtherPage;