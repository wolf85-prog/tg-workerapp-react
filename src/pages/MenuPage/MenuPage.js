import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import ButtonStatus from "../../components/UI/ButtonStatus/ButtonStatus";
import MyButton from "../../components/UI/MyButton/MyButton";
import './MenuPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";


const API_URL = process.env.REACT_APP_API_URL

const MenuPage = () => {
    
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
            <Header header={{title: 'Workhub', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 

            <form>
                <Link to={'/profile'}><ButtonStatus>Профиль</ButtonStatus></Link> 
                <Link to={'/projects'}><ButtonStatus>Проекты</ButtonStatus></Link>  
                <Link to={'/page3'}><ButtonStatus>Смета</ButtonStatus></Link>  
                <ButtonStatus role="link" onClick={() => openInNewTab('https://t.me/ULEY_Office_Bot')}>Офис</ButtonStatus> 
                <Link to={'/page5'}><ButtonStatus>Информация</ButtonStatus></Link>  
                <Link to={'/page6'}><ButtonStatus>Помощь / FAQ</ButtonStatus></Link>  
            </form>
            
            <Link to={'/contacts'}><MyButton style={{width: "auto", background: '#3f4052', border: '1px solid #3f4052', marginTop: '130px'}}>Контакты</MyButton></Link> 
        </div>
    );
};


export default MenuPage;