import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './ContactPage.css';
import MyButton from "../../components/UI/MyButton/MyButton";
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";

import btnContact1 from "../../image/Workhub[E-mail].png";
import btnContact2 from "../../image/Workhub[Phone].png";
import btnContact3 from "../../image/Workhub[Vk].png";
import btnContact4 from "../../image/Workhub[Web].png";

const API_URL = process.env.REACT_APP_API_URL

const ContactPage = () => {
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Контакты', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 
            
            <div className="form-contact">
                <a href="tel:+74995001411"><img src={btnContact2} width='90' className='btns' alt=''/></a>
                <a href="mailto:u.l.e.y@mail.ru"><img src={btnContact1} width='90' className='btns' alt=''/></a>
                <img src={btnContact4} onClick={() => openInNewTab('https://uley.team/')} width='90' className='btns' alt=''/>
                <img src={btnContact3} onClick={() => openInNewTab('https://vk.com/uley.team')} width='90' className='btns' alt=''/>

                <div className='block-buttons-contact'>
                    <Link to={'/menu'}><MyButton style={{marginTop: '100px', width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>
                </div>
            </div>
            
        </div>
    );
};


export default ContactPage;