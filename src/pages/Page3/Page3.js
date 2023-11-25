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
import { getProjectsCash , getSmetaCash} from '../../http/chatAPI';

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
    // useEffect(() => {
    //     console.log('start specId: ', specId)
    //     setIsPostsLoading(true)
        
    //     const fetchDataProjects = async () => {
    //         const arrayProject = []
                   
    //         console.log("Начинаю загружать проекты...")
    //         const projects = await getProjectsCash();

    //         console.log("Начинаю загружать сметы...")
    //         const smets = await getSmetaCash();
    //         console.log("smets: ", smets)

    //         projects.map((project)=> {
    //             let projObject = smets.find((proj) => proj.projectId === project.id)

    //             const newProject = {
    //                 id: project.id,
    //                 title: project.title,
    //                 date_start: project.dateStart,
    //                 date_end: project.dateEnd,
    //                 status: JSON.parse(project.status),
    //                 specs: JSON.parse(project.specs),
    //                 smeta: projObject ? JSON.parse(projObject?.dop) : "",
    //             }
    //             console.log(newProject)
    //             arrayProject.push(newProject)
    //         })

    //         console.log(arrayProject)
                
    //         setProjects(arrayProject)

    //         setTimeout(()=> {
    //             setIsPostsLoading(false) 
    //         }, 1000)    
    //     }

    //     fetchDataProjects()                    
    // }, [])

    useEffect(() => {
        const fetchData = async() => { 
            
            setIsPostsLoading(true)

            setIsPostsLoading(false)   
        }

        fetchData()

    }, [])

    {/* Закрыть */}
    const clickButton = () => {
        setModal(false)
    }

    const showPopup = () => {
        setModal(true)
        setTimeout(()=> {
            setModal(false)
        }, 3000)
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
                : <div id="table-scroll" className="table-scroll">
                    <div className="table-wrap">
                        <table className="main-table" id="table">
                        <thead>
                            <tr>
                            <th className="fixed-side" scope="col" style={{minWidth: '60px', height:'45px', zIndex: '15'}}>Дата</th>
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
                        {sortedAndSearchedPosts.length > 0 ?
                        sortedAndSearchedPosts.map((item, index) => (
                            <tr>
                                <td className="fixed-side">{item.specs[0].date.split("T")[0].split('-')[2] + '.' + item.specs[0].date.split("T")[0].split('-')[1] + "." + item.specs[0].date.split("T")[0].split('-')[0]}</td>
                                <td>{item.title}</td>
                                <td>{item.specs.filter((item) => item.id === specId)[0]?.vid}</td>
                                <td>{item.smeta ? item.smeta.filter((item) => item.fio_id === specId)[0]?.start : "00:00"}</td>
                                <td>{item.smeta ? item.smeta.filter((item) => item.fio_id === specId)[0]?.stop : "00:00"}</td>
                                <td>{item.smeta ? item.smeta.filter((item) => item.fio_id === specId)[0]?.stavka : "0,00"}</td>
                                <td>{item.smeta ? item.smeta.filter((item) => item.fio_id === specId)[0]?.pererabotka : "0,00"}</td>
                                <td>{item.smeta ? item.smeta.filter((item) => item.fio_id === specId)[0]?.gsm : "0,00"}</td>
                                
                                <td>-</td>
                                <td style={{padding: '4px'}}><img src={check2} width='25' style={{verticalAlign: 'middle', padding: '3px'}} alt=''/></td>
                            </tr>
                            ))
                        : <tr>
                            <td className="fixed-side"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td style={{padding: '4px'}}><img src={check2} width='25' style={{verticalAlign: 'middle', padding: '3px'}} alt=''/></td>
                        </tr>
                        }
                        <tr>
                            <td colSpan={7} style={{padding: '0'}}></td>
                            <td style={{padding: '0'}}>Итого:</td>
                            <td style={{padding: '0'}}>0,00</td>
                            <td style={{padding: '0'}}></td>
                        </tr>
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