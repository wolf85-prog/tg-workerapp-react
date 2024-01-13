import React, { createContext, useContext, useEffect, useState } from "react";
import { getWorkerId } from './../http/chatAPI';
import {useTelegram} from "./../hooks/useTelegram";

const UserContext = createContext();

const useUsersContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
	const {user} = useTelegram();

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
	const [workerhub, setWorkerhub] = useState([]);
	const [summa, setSumma] = useState(0);

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

	const [friend, setFriend] = useState('');

	const [widthStr, setWidthStr] = useState(0)
	const [str, setStr] = useState(0)

	// при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        const fetchData = async() => {
            const worker = await getWorkerId(user?.id) //user?.id '805436270'
            console.log("worker context: ", worker)
            setWorkerhub(worker)
        }

        fetchData()

    }, []);


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
			workerhub,
			setWorkerhub,
			summa,
			setSumma,
			widthStr, 
			setWidthStr,
			str,
			setStr,
			friend,
			setFriend
		}}>
			{children}
		</UserContext.Provider>
	);
};

export { useUsersContext, UserProvider };