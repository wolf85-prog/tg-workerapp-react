import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './ContactPage.css';
import MyButton from "../../components/UI/MyButton/MyButton";
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";


const API_URL = process.env.REACT_APP_API_URL

const ContactPage = () => {
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Контакты', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 
            
            <form>
                <h3>+7 (499) 500-14-11</h3>
                <h3>u.l.e.y@mail.ru</h3>
            </form>

            <div className='block-buttons'>
                <Link to={'/menu'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>
            </div>
            
        </div>
    );
};


export default ContactPage;