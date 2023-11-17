import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
//import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './Page3.css';
import MyButton from "../../components/UI/MyButton/MyButton";
import MyModal from "../../components/MyModal/MyModal";
import Loader from "../../components/UI/Loader/Loader";

import { useUsersContext } from "../../contexts/UserContext"
import {useProjects} from "../../hooks/useProjects"
import { getProjectsAll, getBlockId, getDatabase } from './../../http/chatAPI';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import check2 from "../../image/check2.png";
import uncheck2 from "../../image/uncheck2.png";
import banner from "../../image/BannerWorkhub3.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"
import BackModal from "../../image/background/background_modal.png"

const Page3 = () => {
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
    const [modal, setModal] = useState(false)

    const { projects, setProjects, specId} = useUsersContext();

    const [projects2, setProjects2] = useState([])

    const [proj, setProj] = useState([])
    const [isPostsLoading, setIsPostsLoading] = useState(false);

    const [filter, setFilter] = useState({sort: 'date_start', query: 'Все'});
    const sortedAndSearchedPosts = useProjects(projects, filter.sort, filter.query, specId); //specId
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх  
    });

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        console.log(projects)
        const proj = projects.filter(post=> post.spec.find(item => item.id === specId));  
        //console.log("proj: ", proj)
        setProj(proj)
                   
    }, [projects])

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
            console.log('start')
            setIsPostsLoading(true)
            
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
                                            setIsPostsLoading(false)
                                            console.log("arrayProject: ", arrayProject)
                                            setProjects2(arrayProject) 
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
                    setIsPostsLoading(false)
                    console.log("arrayProject: ", projects)
                    setProjects2(projects) 
                }   
            }
    
    
            fetchDataProjects()                    
    }, [])

    {/* Закрыть */}
    const clickButton = () => {
        setModal(false)
    }

    const showPopup = () => {
        setModal(true)
        setTimeout(()=> {
            setModal(false)
        }, 1300)
    }

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моя смета', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0', opacity: '0.6'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
            
            <div className='form-smeta-page3'>                                
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50%'}}><Loader/></div>
                : <div id="table-scroll" class="table-scroll">
                    <div class="table-wrap">
                        <table class="main-table" id="table">
                        <thead>
                            <tr>
                            <th class="fixed-side" scope="col" style={{minWidth: '60px', height:'45px', zIndex: '15'}}>Дата</th>
                                <th scope="col" style={{minWidth: '200px'}}>Проект</th>
                                <th scope="col" style={{minWidth: '150px'}}>Вид работ</th>
                                <th scope="col" style={{minWidth: '60px'}}>Старт</th>
                                <th scope="col" style={{minWidth: '60px'}}>Стоп</th>
                                <th scope="col" style={{minWidth: '100px'}}>Ставка</th>
                                <th scope="col" style={{minWidth: '100px'}}>Переработка</th>
                                <th scope="col" style={{minWidth: '120px'}}>Доп. расходы</th>
                                <th scope="col" style={{minWidth: '100px'}}>Итого</th>
                                <th scope="col" style={{padding: 0}}></th>
                            </tr>
                        </thead>
                        <tbody>
                        {sortedAndSearchedPosts.map((item, index) => (
                            <tr>
                                <td class="fixed-side">{index+1}</td>
                                <td>{item.title}</td>
                                <td></td>
                                <td>00:00</td>
                                <td>00:00</td>
                                <td>0,00</td>
                                <td>0,00</td>
                                <td>0,00</td>
                                <td>0,00</td>
                                <td style={{padding: '4px'}}><img src={check2} width='25' style={{verticalAlign: 'middle', padding: '3px'}} alt=''/></td>
                            </tr>
                            ))
                        }
                        </tbody>
                        </table>
                    </div>
                    <img className='style-banner' src={banner} alt='' width='100%' />

                </div>
                }
                
                <div className='block2'>

                    <MyButton onClick={showPopup} style={{width: "auto", height: '40px', border: '0px', backgroundImage: `linear-gradient(#000000, #3d413e)`}}>
                        Подтвердить смету
                    </MyButton>
                    <MyButton onClick={showPopup} style={{width: "auto", height: '40px', border: '0px', backgroundImage: `linear-gradient(#000000, #3d413e)`}}>
                        Запросить информацию по смете
                    </MyButton>
                    <MyButton onClick={showPopup} style={{width: "auto", height: '40px', border: '0px', backgroundImage: `linear-gradient(#000000, #3d413e)`}}>
                    Выставить счет
                    </MyButton>         
                </div>
                      
            </div>

            <div className='footer-block'>
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>

            <MyModal visible={modal} setVisible={setModal}>
                <p style={{position: 'absolute', width: '100%', top: '25%'}}>
                    Функция находится в разработке
                </p>
                <img src={BackModal} alt=''/>
            </MyModal>

        </div>
    );
};


export default Page3;