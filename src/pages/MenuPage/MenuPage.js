import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonStatus from "../../components/UI/ButtonStatus/ButtonStatus";
import './MenuPage.css';
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks/useTelegram";
import { useUsersContext } from "../../contexts/UserContext"
import { useResize } from './../../hooks/useResize';
import { getWorkerId, getProjectsCash, getSmetaCash } from '../../http/chatAPI';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import ButtonsMenu2 from "../../image/buttons/button_for_menu2.png"
import smallMenu from "../../image/layers/ULEY text.png"

const MenuPage = () => {
    const {user} = useTelegram();
    const navigate = useNavigate();
    //const { workerhub: worker } = useUsersContext();
    const { setSpecId, flag } = useUsersContext();
    const { projects, setProjects, specId} = useUsersContext();

    const { width, isScreenSm, isScreenMd, isScreenLg, } = useResize();

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

 //----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже   
    useEffect(() => {
        const fetchData = async() => { 
            const worker = await getWorkerId(user?.id) //'805436270' '1408579113' user?.id '6143011220'
            console.log("worker: ", worker.length) 
            console.log(worker[0]?.id)
            setSpecId(worker[0]?.id)
            
            setTimeout(()=> {      
                if (worker.length > 0) {
                    //зарегистрирован
                    console.log("Зарегистирован", "REG")
                    setSpecId(worker[0]?.id)
                } else  {
                    if (flag === 'ONLY_REG') {
                        //только что зарегистрирован
                        console.log("Только что зарегистировался", flag)
                        navigate("/process")
                    } 
                    else if (flag === 'NOREG') {
                        //не зарегистрирован
                        console.log("Зарегистрируйтесь! NOREG")
                        navigate("/add-worker")
                    }
                }
            }, 10000)
        }

        fetchData()   
    }, []);

    useEffect(()=> {
        const fetchDataProjects = async () => {
            const arrayProject = []
                   
            console.log("Начинаю загружать проекты...")
            const projects = await getProjectsCash();

            console.log("Начинаю загружать сметы...")
            const smets = await getSmetaCash();
            console.log("smets: ", smets)

            projects.map((project)=> {
                let projObject = smets.find((proj) => proj.projectId === project.id)

                const newProject = {
                    id: project.id,
                    title: project.title,
                    date_start: project.dateStart,
                    date_end: project.dateEnd,
                    status: JSON.parse(project.status),
                    specs: JSON.parse(project.specs),
                    smeta: projObject ? JSON.parse(projObject?.dop) : "",
                }
                //console.log(newProject)
                arrayProject.push(newProject)
            })

            console.log(arrayProject)
            
            setProjects(arrayProject)        
        }

        fetchDataProjects()                    
    }, [])

    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх   
    })

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Меню', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0', opacity: '0.6'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
           
            <div style={{display: 'flex', height: '100vh', position: 'fixed'}}>
                <div className='menu-form'>               
                    <Link to={'/profile'}><button className="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Профиль</button></Link>
                    <Link to={'/projects'}><button className="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Проекты</button></Link>
                    <Link to={'/page3'}><button className="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Смета</button></Link>
                    <button role="link" className="image-button"  style={{ backgroundImage: `url(${ButtonsMenu2})`}} onClick={() => openInNewTab('https://t.me/ULEY_Office_Bot')}>Офис</button> 
                    <Link to={'/stavki'}><button className="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Ставки</button></Link>
                    <Link to={'/info'}><button className="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Информация</button></Link>
                    <Link to={'/contacts'}><button className="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Контакты</button></Link>           
                </div>
            </div>
            

            <div style={{position: 'fixed', bottom: '25px', right: '0'}}>
                <img src={smallMenu} alt='' className='small-menu-icon' />
            </div>
            
             
        </div>
    );
};


export default MenuPage;