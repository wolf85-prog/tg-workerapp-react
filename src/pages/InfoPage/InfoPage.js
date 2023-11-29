import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
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
    const {tg, user} = useTelegram();
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
    const [modal, setModal] = useState(false)

//----------------------------------------------------------------------------------
    const navigate = useNavigate();
    const handleClick = () => navigate(-1);

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх 
    });

    

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

    useEffect(() => {
        tg.onEvent("backButtonClicked", handleClick)
        return () => {
            tg.offEvent('backButtonClicked', handleClick)
        }
    }, [handleClick])

    useEffect(() => {
        tg.BackButton.show();
    }, [])
    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Информация', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed'}}>
                <div className='menu-form-info'>
                    <Link to={'/info1'}><button className="button-info" style={{ backgroundImage: `url(${ButtonsInfo})`}}>С чего начать</button></Link> 
                    <button className="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Первый проект</button>
                    <button className="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Чат проекта</button> 
                    <button className="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Переработки</button> 
                    <button className="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Логистика</button>
                    <button className="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Мерч</button> 
                    <button className="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Фотоотчет</button>
                    <button className="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Запас</button>
                    <button className="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Смета</button>
                    <button className="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Способ оплаты</button>
                    <button className="button-info" onClick={showPopup} style={{ backgroundImage: `url(${ButtonsInfo})`}}>Техника безопасости</button>
                </div>
            </div>
            
            <div className='footer-block' style={{bottom: '0'}}>
                <Link to={'/profile'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' className='small-menu-icon' />
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


export default InfoPage;