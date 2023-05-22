import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const useUsersContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
	const [workerFam, setWorkerFam] = useState('')
    const [workerName, setWorkerName] = useState('')
    const [phone, setPhone] = useState('');

    return (
		<UserContext.Provider value={{ 
			workerFam, 
			setWorkerFam,
		}}>
			{children}
		</UserContext.Provider>
	);
};

export { useUsersContext, UserProvider };