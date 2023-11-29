import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useProjects} from "../../hooks/useProjects"
import Header from "../../components/Header/Header";
import './ProjectPage.css';

import Loader from "../../components/UI/Loader/Loader";
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter";
import { useUsersContext } from "../../contexts/UserContext"
import { getProjectsCash, getSmetaCash } from '../../http/chatAPI';
import { getWorkerId } from '../../http/chatAPI';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"


const ProjectPage = () => {

    const { projects, setProjects, setSpecId, specId} = useUsersContext();

    const [status, setStatus] = useState([{title: "Все"}, {title: "Новые"}, {title: "Старые"}]);
    const [filter, setFilter] = useState({sort: 'date_start', query: 'Все'});
    const sortedAndSearchedPosts = useProjects(projects, filter.sort, filter.query, specId); //specId '1408579113'

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    const [isPostsLoading, setIsPostsLoading] = useState(false);

    //console.log("spesID: ", props.worker)

//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => { 
            
            setIsPostsLoading(true)

            setIsPostsLoading(false)   
        }

        fetchData()

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
                    : <ProjectList posts={sortedAndSearchedPosts} title="" workerId={specId}/>
                }
            </div>   

            <div className='footer-block'>
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' className='small-menu-icon' />
            </div>  
            
        </div>
    );
};


export default ProjectPage;