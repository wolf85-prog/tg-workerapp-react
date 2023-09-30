import React, { createContext, useContext, useEffect, useState } from "react";
import { getProjectsAll, getBlockId, getDatabase } from '../http/chatAPI';

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

	useEffect(() => {
		const fetchData = async () => {
			let response = await getProjectsAll()  ;
			console.log("projects size: ", response.length)
	
			const arrayProject = []
			let count = 0;
			let databaseBlock;
	
			response.map(async (project, index) => {
				const arraySpec = []
				const blockId = await getBlockId(project.id);
				//console.log("blockId: ", index + 1, blockId)
				if (blockId) { 
					databaseBlock = await getDatabase(blockId); 
					//console.log("databaseBlock: ", index + 1, databaseBlock) 
					
					//если бд ноушена доступна
					if (databaseBlock.length > 0) {
						databaseBlock.map((db) => {
							//console.log(db?.fio_id)
							if (db.fio_id) {
								const newSpec = {
									id: db?.fio_id,
								}
								arraySpec.push(newSpec)
							}
						})

						const newProject = {
							id: project.id,
							title: project.title,
							date_start: project.date_start,
							date_end: project.date_end,
							status: project.status,
							spec: arraySpec,
						}
			
					 	arrayProject.push(newProject)
					}                   
				} else {
					console.log("База данных не найдена! Проект ID: " + project.title)
				}		
			})

			setTimeout(() => {
				setProjects(arrayProject)
				console.log("projects: ", arrayProject)
			}, 10000)	
		}

		fetchData()
	},[])

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
		}}>
			{children}
		</UserContext.Provider>
	);
};

export { useUsersContext, UserProvider };