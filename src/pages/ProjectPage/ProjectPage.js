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
    const sortedAndSearchedPosts = useProjects(projects2, filter.sort, filter.query, specId); //specId '1408579113'

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const arr_status = [] 
    const arrayProjects = []
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        console.log('start specId: ', specId)
        setIsPostsLoading(true)
        
        const fetchDataProjects = async () => {
            const arrayProject = []
            const arrayBlock = []
            let count = 0;
            let databaseBlock;
            let i = 0;

            //const projs = localStorage ? JSON.parse(localStorage.getItem('projects')) : [];
            //console.log("projs: ", projs)
            
            //if (projs.length === 0) {         
                console.log("Начинаю загружать проекты...")
                let response = await getProjectsAll();

                if (response.length !== 0) {
                    console.log("projects: ", response)

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
                                            vid: db?.vid,
                                            spec: db?.spec,
                                            date: db?.date,
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
                                    specs: arraySpec,
                                }
                                arrayProject.push(newProject)

                                setProjects2(arrayProject) 

                                console.log(newProject)
                                console.log("arrayProject size: ", arrayProject.length )
                            }                   
                        } else {
                            console.log("База данных не найдена! Проект ID: " + project.title)
                        }	  
                    })
                    
                    setTimeout(()=>{
                        
                        console.log("arrayProject: ", arrayProject)
                        setProjects2(arrayProject) 
                        

                        //сохраняю в кэш
                        //localStorage.setItem('projects', JSON.stringify(arrayProject));

                        if (filter.query === 'Все') {
                            console.log("filter all")
                            const arr = arrayProject.filter(post=> post.specs.find(item => item.id === specId)); //posts2; 
                            console.log("arr: ", arr)  
                            setProjects2(arr)
                        }
            
                        if (filter.query === 'Новые') {
                            const arr = arrayProject.filter(post => ((post.status != null ? post.status.name : '') === "Load" ||
                                                    (post.status != null ? post.status.name : '') === "Ready" ||
                                                    (post.status != null ? post.status.name : '') === "OnAir") && post.specs.find(item => item.id === specId))        //post2 
                            console.log("arr: ", arr)  
                            setProjects2(arr)
                        }
            
                        if (filter.query === 'Старые') {         
                            const arr = arrayProject.filter(post => ((post.status != null ? post.status.name : '') === "Done" ||
                                                    (post.status != null ? post.status.name : '') === "Wasted") && post.specs.find(item => item.id === specId)) //post2  
                            console.log("arr: ", arr)                           
                            setProjects2(arr)
                        }
                        setIsPostsLoading(false)
                        
                    }, 12000)     

                }
                   
           // }  else {
                // console.log("Проекты взяты из кэша...")

                // if (filter.query === 'Все') {
                //     console.log("filter all")
                //     const arr = projs.filter(post=> post.specs.find(item => item.id === specId)); //posts2; 
                //     console.log("arr: ", arr)  
                //     setProjects2(arr)
                // }
    
                // if (filter.query === 'Новые') {
                //     const arr = projs.filter(post => ((post.status != null ? post.status.name : '') === "Load" ||
                //                             (post.status != null ? post.status.name : '') === "Ready" ||
                //                             (post.status != null ? post.status.name : '') === "OnAir") && post.specs.find(item => item.id === specId))        //post2 
                //     console.log("arr: ", arr)  
                //     setProjects2(arr)
                // }
    
                // if (filter.query === 'Старые') {         
                //     const arr = projs.filter(post => ((post.status != null ? post.status.name : '') === "Done" ||
                //                             (post.status != null ? post.status.name : '') === "Wasted") && post.specs.find(item => item.id === specId)) //post2  
                //     console.log("arr: ", arr)                           
                //     setProjects2(arr)
                // }
                
                //setIsPostsLoading(false)
            //}  
            
        }

        fetchDataProjects()                    
    }, [])


    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх  
    })

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Мои проекты', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0', opacity: '0.6'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
           

            <ProjectFilter
                filter={filter}
                setFilter={setFilter}
                arr_status={status}
            />

            <div className="project-list">                   
                {isPostsLoading
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50%'}}><Loader/></div>
                    : <ProjectList posts={projects2} title="" worker={specId}/>
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