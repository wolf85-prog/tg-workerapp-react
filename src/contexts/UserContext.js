import React, { createContext, useContext, useEffect, useState } from "react";
import { getProjectsAll, getBlockId, getDatabase } from './../http/chatAPI';

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

	//статус регистрации
	const [flag, setFlag] = useState("NOREG") // NOREG, ONLY_REG, REG

	//passport
	const [pasFam, setPasFam] = useState('')
    const [pasName, setPasName] = useState('')
	const [pasSoname, setPasSoname] = useState('')
    const [pasDateborn, setPasDateborn] = useState('');
	const [pasNumber, setPasNumber] = useState('');
	const [pasDate, setPasDate] = useState('');
	const [pasKem, setPasKem] = useState('');
	const [pasKod, setPasKod] = useState('');
	const [pasPlaceborn, setPasPlaceborn] = useState('');
	const [pasAdress, setPasAdress] = useState('');
	const [pasEmail, setPasEmail] = useState('');


	// при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        console.log('start')
        //setIsPostsLoading(true)
        
        const fetchDataProjects = async () => {
            console.log("projects contex: ", projects)

            const projs = projects.length > 0 ? JSON.parse(localStorage.getItem('projects')) : '';
            console.log("projs: ", projs)
            
            if (projects.length === 0) {         
                console.log("Начинаю загружать проекты...")
                let response = await getProjectsAll();
                console.log("projects size: ", response.size)

                const arrayProject = []
                const arrayBlock = []
                let count = 0;
                let databaseBlock;

                if (response.length !== 0) {

                    response.map(async (project, index) => {
                        const arraySpec = []
                        const blockId = await getBlockId(project.id);

                        if (blockId) { 
                            databaseBlock = await getDatabase(blockId); 
                            
                            //если бд ноушена доступна
                            if (databaseBlock.length > 0) {
                                databaseBlock.map((db) => {
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
                                console.log(newProject)
                                arrayProject.push(newProject)

                                if (index === response.length - 1) {
                                    setTimeout(()=>{
                                        //setIsPostsLoading(false)
                                        console.log("arrayProject: ", arrayProject)
                                        //setProjects2(arrayProject) 
                                        setProjects(arrayProject) 

                                        localStorage.setItem('projects', JSON.stringify(arrayProject));
                                    }, 10000)    
                                }
                            }                   
                        } else {
                            console.log("База данных не найдена! Проект ID: " + project.title)
                        }	  
                    })
                }   
            }  else {
                console.log("Проекты уже загружены!")
                //setIsPostsLoading(false)
                console.log("arrayProject: ", projects)
                //setProjects2(projects) 
            }   
        }


        fetchDataProjects()                    
    }, [])

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
			flag, 
			setFlag,
			pasFam, 
			setPasFam,
    		pasName, 
			setPasName,
			pasSoname, 
			setPasSoname,
    		pasDateborn, 
			setPasDateborn,
			pasNumber, 
			setPasNumber,
			pasDate, 
			setPasDate,
			pasKem, 
			setPasKem,
			pasKod, 
			setPasKod,
			pasPlaceborn, 
			setPasPlaceborn,
			pasAdress, 
			setPasAdress,
			pasEmail, 
			setPasEmail,
		}}>
			{children}
		</UserContext.Provider>
	);
};

export { useUsersContext, UserProvider };