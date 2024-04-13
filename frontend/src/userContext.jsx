import React, { createContext, useState} from 'react';

const UserContext = createContext(null);
export default UserContext;
export const UserProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState('Ramu');
    return (
        <UserContext.Provider value={{currUser,setCurrUser}}>
            {children}
        </UserContext.Provider>
    );
};
