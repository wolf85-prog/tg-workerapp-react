import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonStatus from "../../components/UI/ButtonStatus/ButtonStatus";
import MyButton from "../../components/UI/MyButton/MyButton";
import './InfoPage.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import ButtonsInfo from "../../image/buttons/button_info.png"
import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"

const InfoPage = () => {
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    });

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Информация', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed'}}>
                <div className='menu-form-info'>
                    <Link to={'/info1'}><button class="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>С чего начать</button></Link> 
                    <Link to={'/'}><button class="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>Первый проект</button></Link>  
                    <Link to={'/'}><button class="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>Чат проекта</button></Link>  
                    <Link to={'/'}><button class="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>Переработки</button></Link>  
                    <Link to={'/'}><button class="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>Логистика</button></Link>
                    <Link to={'/'}><button class="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>Мерч</button></Link>  
                    <Link to={'/'}><button class="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>Фотоотчет</button></Link>
                    <Link to={'/'}><button class="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>Запас</button></Link>
                    <Link to={'/'}><button class="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>Смета</button></Link>
                    <Link to={'/'}><button class="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>Способ оплаты</button></Link>
                    <Link to={'/'}><button class="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>Техника безопасости</button></Link>
                </div>
            </div>
            
            <div className='footer-block' style={{bottom: '0'}}>
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>
        </div>
    );
};


export default InfoPage;