import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonStatus from "../../components/UI/ButtonStatus/ButtonStatus";
import './MenuPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
import Loader from "../../components/UI/Loader/Loader";
import { useUsersContext } from "../../contexts/UserContext"
import { getProjectsAll, getBlockId, getDatabase } from '../../http/chatAPI';


const MenuPage = () => {

    const { setSpecId, setProjects, projects } = useUsersContext();
    const [isPostsLoading, setIsPostsLoading] = useState(false);
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchDataProjects = async () => {
            console.log("projects contex: ", projects)

            if (projects.length === 0) {
                setIsPostsLoading(true)
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
                                        setProjects(arrayProject) 
                                    }, 3000)    
                                }
                            }                   
                        } else {
                            console.log("База данных не найдена! Проект ID: " + project.title)
                        }	  
                    })
                }    
            }    
        }


        fetchDataProjects()
    }, []);

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Меню', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 
            {isPostsLoading ?
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '330px'}}><Loader/></div>
            :<div className='menu-form'>
                <Link to={'/profile'}><ButtonStatus>Профиль</ButtonStatus></Link> 
                <Link to={'/projects'}><ButtonStatus>Проекты</ButtonStatus></Link>  
                <Link to={'/page3'}><ButtonStatus>Смета</ButtonStatus></Link>  
                <ButtonStatus role="link" onClick={() => openInNewTab('https://t.me/ULEY_Office_Bot')}>Офис</ButtonStatus> 
                <Link to={'/info'}><ButtonStatus>Информация</ButtonStatus></Link>  
                <Link to={'/stavki'}><ButtonStatus>Ставки</ButtonStatus></Link>
                <Link to={'/page6'}><ButtonStatus>Помощь / FAQ</ButtonStatus></Link>  
                <Link to={'/contacts'}><ButtonStatus>Контакты</ButtonStatus></Link>
            </div>
            }
             
        </div>
    );
};


export default MenuPage;