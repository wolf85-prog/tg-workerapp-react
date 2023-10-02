import React, { createContext, useContext, useEffect, useState } from "react";
//import { getProjectsAll, getBlockId, getDatabase } from '../http/chatAPI';

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
    const [dateborn, setDateborn] = useState('');

	const [companys, setCompanys] = useState('');
    const [stag, setStag] = useState('');

	const [projects, setProjects] = useState([]);

	const [specId, setSpecId] = useState('');

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
			projects,
			setProjects,
			specId,
			setSpecId,
		}}>
			{children}
		</UserContext.Provider>
	);
};

export { useUsersContext, UserProvider };