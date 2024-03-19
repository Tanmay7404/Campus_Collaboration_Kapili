import React, { useEffect } from 'react';
import { useParams,Navigate } from 'react-router-dom';
const RedirectToOtherPage = ({setUser}) => {
  
  const {username} = useParams();
  useEffect(() => {
    // Call your function here
    redirectToOtherPage();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const redirectToOtherPage = () => {
    const decodedUsername = decodeURIComponent(username);
    setUser(decodedUsername);
  };

  // Return null to render nothing
  return <Navigate to="/explore"/>;
};

export default RedirectToOtherPage;