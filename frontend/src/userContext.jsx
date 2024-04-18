import React, { createContext, useState,useEffect} from 'react';

const UserContext = createContext(null);
export default UserContext;
export const UserProvider = ({ children }) => {

    const [currUser, setCurrUser] = useState(null);

    useEffect(()=>{
        async function fetchData(){
 const loggedInUser = localStorage.getItem("user");
 console.log(loggedInUser)
    if (loggedInUser) {
        
    //   const foundUser = JSON.parse(loggedInUser);
      setCurrUser(loggedInUser);
    }    }}
    ,[])
    return (
        <UserContext.Provider value={{currUser,setCurrUser}}>
            {children}
        </UserContext.Provider>
    );
};
