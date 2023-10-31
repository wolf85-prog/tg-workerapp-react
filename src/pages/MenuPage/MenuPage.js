import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonStatus from "../../components/UI/ButtonStatus/ButtonStatus";
import './MenuPage.css';
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks/useTelegram";
import { useUsersContext } from "../../contexts/UserContext"
import { useResize } from './../../hooks/useResize';
import { getWorkerId } from '../../http/chatAPI';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/layers/ULEY_triangle.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import ButtonsMenu2 from "../../image/buttons/button_for_menu2.png"
import smallMenu from "../../image/layers/ULEY text.png"

const MenuPage = () => {
    const {user} = useTelegram();
    const navigate = useNavigate();
    const { width, isScreenSm, isScreenMd, isScreenLg, } = useResize();

    const { setProjects, projects } = useUsersContext();
    const { setSpecId, flag } = useUsersContext();

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

 //----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => { 
            const worker = await getWorkerId(user?.id) //'805436270' '1408579113' user?.id

            if (worker.length > 0) {
                //зарегистрирован
                console.log("Зарегистирован", "REG")
                setSpecId(worker[0]?.id)

            } else  {
                if (flag === 'ONLY_REG') {
                    //только что зарегистрирован
                    console.log("Только что зарегистировался", user?.id, flag)
                    navigate("/process")
                } 
                else if (flag === 'NOREG') {
                    //не зарегистрирован
                    console.log("Зарегистрируйтесь!", user?.id)
                    navigate("/add-worker")
                }
            }
        }

        fetchData()   
    });

    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
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
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
           
            <div className='menu-form'>               
                <Link to={'/profile'}><button class="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Профиль</button></Link>
                <Link to={'/projects'}><button class="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Проекты</button></Link>
                <Link to={'/page3'}><button class="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Смета</button></Link>
                <button role="link" class="image-button"  style={{ backgroundImage: `url(${ButtonsMenu2})`}} onClick={() => openInNewTab('https://t.me/ULEY_Office_Bot')}>Офис</button> 
                <Link to={'/stavki'}><button class="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Ставки</button></Link>
                <Link to={'/info'}><button class="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Информация</button></Link>
                <Link to={'/contacts'}><button class="image-button" style={{ backgroundImage: `url(${ButtonsMenu2})`}}>Контакты</button></Link>           
            </div>

            <div style={{position: 'absolute', right: '0', top: '650px'}}>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '25px', width: '120px'}} />
            </div>
            
             
        </div>
    );
};


export default MenuPage;