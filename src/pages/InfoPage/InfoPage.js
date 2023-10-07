import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import ButtonStatus from "../../components/UI/ButtonStatus/ButtonStatus";
import MyButton from "../../components/UI/MyButton/MyButton";
import './InfoPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/BlueLine1.png";


const InfoPage = () => {
    
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
            <Header header={{title: 'Информация', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 

            <div className='menu-form-info'>
                <Link to={'/info1'}><ButtonStatus>С чего начать</ButtonStatus></Link> 
                <Link to={'/'}><ButtonStatus>Первый проект</ButtonStatus></Link>  
                <Link to={'/'}><ButtonStatus>Чат проекта</ButtonStatus></Link>  
                <Link to={'/'}><ButtonStatus>Переработки</ButtonStatus></Link>  
                <Link to={'/'}><ButtonStatus>Логистика</ButtonStatus></Link>
                <Link to={'/'}><ButtonStatus>Мерч</ButtonStatus></Link>  
                <Link to={'/'}><ButtonStatus>Фотоотчет</ButtonStatus></Link>
                <Link to={'/'}><ButtonStatus>Запас</ButtonStatus></Link>
                <Link to={'/'}><ButtonStatus>Смета</ButtonStatus></Link>
                <Link to={'/'}><ButtonStatus>Способ оплаты</ButtonStatus></Link>
                <Link to={'/'}><ButtonStatus>Техника безопасости</ButtonStatus></Link>
            </div>
            
            <div className='block-info'>
                <Link to={'/menu'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>       
            </div> 
        </div>
    );
};


export default InfoPage;