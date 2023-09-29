import React, { useEffect } from 'react';
import {Link, useLocation} from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonStatus from "../../components/UI/ButtonStatus/ButtonStatus";
import './MenuPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";


const API_URL = process.env.REACT_APP_API_URL

const MenuPage = () => {
    const location = useLocation()

    const specId = location.state?.spec
    console.log("specId: ", specId)
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
            <Header header={{title: 'Меню', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 

            <div className='menu-form'>
                <Link to={'/profile'}><ButtonStatus>Профиль</ButtonStatus></Link> 
                <Link to={'/projects'} state={{specId}}><ButtonStatus>Проекты</ButtonStatus></Link>  
                <Link to={'/page3'}><ButtonStatus>Смета</ButtonStatus></Link>  
                <ButtonStatus role="link" onClick={() => openInNewTab('https://t.me/ULEY_Office_Bot')}>Офис</ButtonStatus> 
                <Link to={'/info'}><ButtonStatus>Информация</ButtonStatus></Link>  
                <Link to={'/stavki'}><ButtonStatus>Ставки</ButtonStatus></Link>
                <Link to={'/page6'}><ButtonStatus>Помощь / FAQ</ButtonStatus></Link>  
                <Link to={'/contacts'}><ButtonStatus>Контакты</ButtonStatus></Link>
            </div>
            
             
        </div>
    );
};


export default MenuPage;