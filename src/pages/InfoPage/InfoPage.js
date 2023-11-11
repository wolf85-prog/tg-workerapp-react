import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonStatus from "../../components/UI/ButtonStatus/ButtonStatus";
import MyButton from "../../components/UI/MyButton/MyButton";
import MyModal from "../../components/MyModal/MyModal";
import './InfoPage.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import ButtonsInfo from "../../image/buttons/button_info.png"
import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"

import BackModal from "../../image/background/background_modal.png"

const InfoPage = () => {
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
    const [modal, setModal] = useState(false)

//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    });

    

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
                    <button class="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Первый проект</button>
                    <button class="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Чат проекта</button> 
                    <button class="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Переработки</button> 
                    <button class="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Логистика</button>
                    <button class="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Мерч</button> 
                    <button class="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Фотоотчет</button>
                    <button class="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Запас</button>
                    <button class="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Смета</button>
                    <button class="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Способ оплаты</button>
                    <button class="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Техника безопасости</button>
                </div>
            </div>
            
            <div className='footer-block' style={{bottom: '0'}}>
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>

            <MyModal visible={modal} setVisible={setModal}>
                <img src={BackModal} alt=''/>
            </MyModal>
        </div>
    );
};


export default InfoPage;