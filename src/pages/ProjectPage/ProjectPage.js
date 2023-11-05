import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {useProjects} from "../../hooks/useProjects"
import Header from "../../components/Header/Header";
import './ProjectPage.css';

import Loader from "../../components/UI/Loader/Loader";
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";
import { useUsersContext } from "../../contexts/UserContext"
import { getProjectsAll, getBlockId, getDatabase } from '../../http/chatAPI';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"


const ProjectPage = () => {
    //const {user} = useTelegram();

    const { projects, setProjects, specId} = useUsersContext();

    const [projects2, setProjects2] = useState([])
    const [status, setStatus] = useState([{title: "Все"}, {title: "Новые"}, {title: "Старые"}]);
    //const [filter, setFilter] = useState('Все');
    const [filter, setFilter] = useState({sort: 'date_start', query: 'Все'});
    const sortedAndSearchedPosts = useProjects(projects2, filter.sort, filter.query, specId); //specId

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

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

                                        //localStorage.setItem('projects', sortedAndSearchedPosts);
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

    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ

        //const rememberMe = localStorage.getItem('projects');
        //console.log("rememberMe: ", rememberMe)
    })

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Мои проекты', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
           

            <ProjectFilter
                filter={filter}
                setFilter={setFilter}
                arr_status={status}
            />

            <div className="project-list">                   
                {isPostsLoading
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50%'}}><Loader/></div>
                    : <ProjectList posts={sortedAndSearchedPosts} title=""/>
                }
            </div>   

            <div className='footer-block'>
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>  
            
        </div>
    );
};


export default ProjectPage;