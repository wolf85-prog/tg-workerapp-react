import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
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


const ProjectPage = () => {
    const {user} = useTelegram();

    const API_URL = process.env.REACT_APP_API_URL;
    const API_URL_PROJECTS_ALL = API_URL + 'api/projectall/';
    const API_URL_PROJECTS_NEW = API_URL + 'api/projectsnew/';
    const API_URL_PROJECTS_OLD = API_URL + 'api/projectsold/';
    const API_URL_BLOCKS = API_URL + 'blocks/';
    const API_URL_DATABASE = API_URL + 'database/';

    const [projects, setProjects] = useState([])
    const [projects2, setProjects2] = useState([])
    const [status, setStatus] = useState([{title: "Все"}, {title: "Новые"}, {title: "Старые"}]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedPosts = useProjects(projects, filter.sort, filter.query);

    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const arr_status = [] 
    const arrayProjects = []
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        console.log('start')
        setIsPostsLoading(true);  
        getProjectData()                 
    },[])

    //1
    const getProjectData = () => {
        console.log('Get URL: '+ API_URL_PROJECTS_NEW)
        const headers = { 'Content-Type': 'application/json' }
        fetch(API_URL_PROJECTS_OLD, { headers })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log("------ post: ", data)
                setProjects(data);
                setIsPostsLoading(false); 
            })
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
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
                    : <ProjectList posts={projects} title=""/>
                }

            </div>   

            <div className='block-menu'>
                <Link to={'/menu'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>       
            </div>    
            
        </div>
    );
};


export default ProjectPage;