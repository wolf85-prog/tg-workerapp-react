import React, { useState, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import './HelloPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
import Loader from "../../components/UI/Loader/Loader";
import { getWorkerId, getProjectsAll, getBlockId, getDatabase } from '../../http/chatAPI';
import Header from '../../components/Header/Header';
import { useUsersContext } from "../../contexts/UserContext"


const HelloPage = () => {

    const {user} = useTelegram();
    const navigate = useNavigate();

    const [fio, setFio] = useState("")

    const { setSpecId, setProjects, projects } = useUsersContext();
    const [isPostsLoading, setIsPostsLoading] = useState(false);
//----------------------------------------------------------------------------------

    useEffect(() => {
        const fetchDataProjects = async () => {
            console.log("projects contex: ", projects)

            if (projects.length === 0) {
                //setIsPostsLoading(true)
                let response = await getProjectsAll()  ;
                console.log("projects size: ", response.length)

                const arrayProject = []
                const arrayBlock = []
                let count = 0;
                let databaseBlock;

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
                
                            arrayProject.push(newProject)


                            const worker = await getWorkerId(user?.id) //'805436270' user?.id
 

                            if (index === response.length - 1) {

                                if (worker.length > 0) {
                                    console.log("Вы уже зарегистрированы!", user?.id)
                    
                                    setFio(`Добро пожаловать на борт, \n ${worker[0]?.fio.split(' ')[1]} ${worker[0]?.fio.split(' ')[2]}!`)
                    
                                    setSpecId(worker[0]?.id)

                                    setTimeout(()=>{
                                        //setIsPostsLoading(false)
                                        console.log("arrayProject: ", arrayProject)
                                        setProjects(arrayProject) 
                                    }, 2000)
                    
                                    setTimeout(() => navigate("/menu"), 4000)
    
                                } else {
                                    console.log("Зарегистрируйтесь!", user?.id)
                                    navigate("/add-worker")
                                }
            
                                 
                            }
                        }                   
                    } else {
                        console.log("База данных не найдена! Проект ID: " + project.title)
                    }	  
                })
            }
            
        }


        fetchDataProjects()

    },[])

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => { 
            const worker = await getWorkerId('1408579113') //'805436270' user?.id

            if (worker.length > 0) {
                console.log("Вы уже зарегистрированы!", user?.id)

                setFio(`Добро пожаловать на борт, \n ${worker[0]?.fio.split(' ')[1]} ${worker[0]?.fio.split(' ')[2]}!`)

                setSpecId(worker[0]?.id)

                setTimeout(() => navigate("/menu"), 4000)

                    // setTimeout(() => navigate("/menu", {
                    //     state: {
                    //       spec: worker[0]?.id,
                    //     }}), 4000)
            } else {
                console.log("Зарегистрируйтесь!", user?.id)
                navigate("/add-worker")
            }
        }

        //fetchData()
     
    });


    return (
        <div className="App">
            <Header header={{title: '', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>
            
            <form>
                <div style={{marginTop: '330px'}}>  
                    {!fio
                        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                        : <p style={{
                                margin: '20px 5px',
                                display: 'flex',
                                fontSize: '26px',
                                color: '#ffffff',
                            }}> {fio}
                        </p>  
                    }                
                           
                </div>       
            </form>
        </div>
    );
};

export default HelloPage;