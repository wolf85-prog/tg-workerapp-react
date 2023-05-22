import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const useUsersContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(''); 

    return (
		<UserContext.Provider value={{ 
			user, 
			setUser,
		}}>
			{children}
		</UserContext.Provider>
	);
};

export { useUsersContext, UserProvider };