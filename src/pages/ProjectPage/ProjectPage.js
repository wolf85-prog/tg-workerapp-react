import React, { useState, useEffect, useCallback } from 'react';
import {Link, useLocation} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useProjects} from "../../hooks/useProjects"
import Header from "../../components/Header/Header";
import './ProjectPage.css';
import MyButton from "../../components/UI/MyButton/MyButton";
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
import Loader from "../../components/UI/Loader/Loader";
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";
import { useUsersContext } from "../../contexts/UserContext"
import { getProjectsAll, getBlockId, getDatabase } from '../../http/chatAPI';


const ProjectPage = () => {
    const {user} = useTelegram();

    const { projects, setProjects, specId} = useUsersContext();

    const [projects2, setProjects2] = useState([])
    const [status, setStatus] = useState([{title: "Все"}, {title: "Новые"}, {title: "Старые"}]);
    //const [filter, setFilter] = useState('Все');
    const [filter, setFilter] = useState({sort: 'date_start', query: 'Все'});
    const sortedAndSearchedPosts = useProjects(projects2, filter.sort, filter.query, specId);

    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const arr_status = [] 
    const arrayProjects = []
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        console.log('start')
        setIsPostsLoading(true)
        
        const fetchDataProjects = async () => {
            console.log("projects contex: ", projects)
            
            if (projects.length === 0) {         
                console.log("Начинаю загружать проекты...")
                let response = await getProjectsAll();
                console.log("projects size: ", response.length)

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
                                        setIsPostsLoading(false)
                                        console.log("arrayProject: ", arrayProject)
                                        setProjects2(arrayProject) 
                                        setProjects(arrayProject) 
                                    }, 3000)    
                                }
                            }                   
                        } else {
                            console.log("База данных не найдена! Проект ID: " + project.title)
                        }	  
                    })
                }   
            }  else {
                console.log("Проекты уже загружены!")
                setIsPostsLoading(false)
                console.log("arrayProject: ", projects)
                setProjects2(projects) 
            }   
        }


        fetchDataProjects()                    
    }, [])

    const fetch = async() => {
        
        //setProjects2(projects) 
        
        // setTimeout(() => {
        //     console.log("projects: ", projects)
        //     setProjects2(projects);
        //     setIsPostsLoading(false);
        // }, 1000);
        
    }

    

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Мои проекты', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 

            <div className="project-list">                  

                <ProjectFilter
                    filter={filter}
                    setFilter={setFilter}
                    arr_status={status}
                />


                {/* {isPostsLoading
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                    : <ProjectList posts={sortedAndSearchedPosts} title=""/>
                }         */}
                
                {isPostsLoading
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50%'}}><Loader/></div>
                    : <ProjectList posts={sortedAndSearchedPosts} title=""/>
                }

            </div>   

            <div className='block-menu'>
                <Link to={'/menu'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>       
            </div>    
            
        </div>
    );
};


export default ProjectPage;