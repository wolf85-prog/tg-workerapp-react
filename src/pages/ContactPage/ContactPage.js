import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import './ContactPage.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"

import btnContact1 from "../../image/buttons/contact[E-mail].png";
import btnContact2 from "../../image/buttons/contact[Phone].png";
import btnContact3 from "../../image/buttons/contact[Vk].png";
import btnContact4 from "../../image/buttons/contact[Web].png";

const ContactPage = () => {
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    });

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Контакты', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed'}}>
                <div className="form-contact">
                    <img src={btnContact2} onClick={() => openInNewTab('tel:+74995001411')}  width='90' className='btns' alt=''/>
                    <img src={btnContact1} onClick={() => openInNewTab('mailto:u.l.e.y@mail.ru')}  width='90' className='btns' alt=''/>
                    <img src={btnContact4} onClick={() => openInNewTab('https://uley.team/')} width='90' className='btns' alt=''/>
                    <img src={btnContact3} onClick={() => openInNewTab('https://vk.com/uley.team')} width='90' className='btns' alt=''/>
                </div>
            </div>

            <div className='footer-block' style={{bottom: '0'}}>
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>

        </div>
    );
};


export default ContactPage;