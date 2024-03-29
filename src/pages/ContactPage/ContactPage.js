import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './ContactPage.css';
import MyModal from "../../components/MyModal/MyModal";

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/logo_04_light.png"

import callPoster from "../../image/call_poster.png"

import btnContact1 from "../../image/buttons/contact[office].png";
import btnContact2 from "../../image/buttons/contact[Phone].png";
import btnContact3 from "../../image/buttons/contact[Vk].png";
import btnContact4 from "../../image/buttons/contact[Web].png";

const ContactPage = () => {
    const {tg, user} = useTelegram();
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
    const [modal, setModal] = useState(false)

    const [showButton1, setShowButton1] = useState(false)
    const [showButton2, setShowButton2] = useState(false)
    const [showButton3, setShowButton3] = useState(false)
    const [showButton4, setShowButton4] = useState(false)
    
//----------------------------------------------------------------------------------
    const navigate = useNavigate();
    const handleClick = () => navigate(-1);

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх 

        setTimeout(() =>  setShowButton1(true), 200) // кнопка 1
        setTimeout(() =>  setShowButton2(true), 700) // кнопка 2
        setTimeout(() =>  setShowButton3(true), 1200) // кнопка 3
        setTimeout(() =>  setShowButton4(true), 1700) // кнопка 4
    });

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const showPopup = () => {   
        setModal(true)
        //setTimeout(()=> {
            openInNewTab('tel:+74995001411')
        //}, 2000)

        setTimeout(()=> {
            setModal(false)       
        }, 6000)
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
            <Header header={{title: 'Контакты', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed'}}>
                <div className="form-contact">
                    <img src={btnContact2} onClick={() => showPopup()} className='btns' alt='' style={{visibility: showButton1 ? "visible": "hidden"}}/>
                    <img src={btnContact1} onClick={() => openInNewTab('https://t.me/ULEY_Office_Bot')} className='btns2' alt='' style={{visibility: showButton2 ? "visible": "hidden"}}/>
                    <img src={btnContact4} onClick={() => openInNewTab('https://uley.team/')} className='btns3' alt='' style={{visibility: showButton3 ? "visible": "hidden"}}/>
                    <img src={btnContact3} onClick={() => openInNewTab('https://vk.com/uley.team')} className='btns4' alt='' style={{visibility: showButton4 ? "visible": "hidden"}}/>
                </div>
            </div>

            <div className='footer-block' style={{bottom: '0'}}>
                {/* <Link to={'/profile'}><img src={btnMenu} alt='' /></Link> */}
                <div></div>
                <img src={smallMenu} alt='' className='small-menu-icon' />
            </div>


            <MyModal visible={modal} setVisible={setModal}>
                <img src={callPoster} alt='' style={{width: '100%', padding: '0 10px'}}/>
            </MyModal>

        </div>
    );
};


export default ContactPage;