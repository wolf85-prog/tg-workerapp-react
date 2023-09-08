import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const useUsersContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
	const [workerFam, setWorkerFam] = useState('')
    const [workerName, setWorkerName] = useState('')
    const [phone, setPhone] = useState('');

	//работник
    const [worker, setWorker] = useState({id: '', cat: '', spec: '', icon: ''})
    
	//специальности
    const [workers, setWorkers] = useState([])

	const [city, setCity] = useState('');
    const [dateborn, setDateborn] = useState('2000-01-01');

	const [companys, setCompanys] = useState('');
    const [stag, setStag] = useState('');

    return (
		<UserContext.Provider value={{ 
			workerFam, 
			setWorkerFam,
			workerName, 
			setWorkerName,
			phone, 
			setPhone,
			worker, 
			setWorker,
			workers, 
			setWorkers,
			city,
			setCity,
			dateborn,
			setDateborn,
			companys, 
			setCompanys,
			stag, 
			setStag,
		}}>
			{children}
		</UserContext.Provider>
	);
};

export { useUsersContext, UserProvider };