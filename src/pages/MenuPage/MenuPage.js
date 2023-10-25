import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonStatus from "../../components/UI/ButtonStatus/ButtonStatus";
import './MenuPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/BlueLine1.png";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks/useTelegram";
import { useUsersContext } from "../../contexts/UserContext"
import { useResize } from './../../hooks/useResize';
import { getWorkerId } from '../../http/chatAPI';

import FonTest01 from "../../image/background/Background 1.0 _ 320 х 568.png";
import FonTest02 from "../../image/background/Background 1.0 _ 375 х 598.png";
import FonTest03 from "../../image/background/Background 1.0 _ 414 х 658.png";

import FonTest11 from "../../image/background/Background 2.0 _ 320 х 568.png";
import FonTest12 from "../../image/background/Background 2.0 _ 375 х 598.png";
import FonTest13 from "../../image/background/Background 2.0 _ 414 х 658.png";

import FonTest21 from "../../image/background/Background 3.0 _ 320 х 568.png";
import FonTest22 from "../../image/background/Background 3.0 _ 375 х 598.png";
import FonTest23 from "../../image/background/Background 3.0 _ 414 х 658.png";

const MenuPage = () => {
    const {user} = useTelegram();
    const navigate = useNavigate();
    const { width, isScreenSm, isScreenMd, isScreenLg, } = useResize();

    const { setProjects, projects } = useUsersContext();
    const { setSpecId, flag } = useUsersContext();

 //----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => { 
            const worker = await getWorkerId(user?.id) //'805436270' '1408579113' user?.id

            if (worker.length > 0) {
                //зарегистрирован
                console.log("Зарегистирован", "REG")
                setSpecId(worker[0]?.id)

            } else  {
                if (flag === 'ONLY_REG') {
                    //только что зарегистрирован
                    console.log("Только что зарегистировался", user?.id, flag)
                    navigate("/process")
                } 
                else if (flag === 'NOREG') {
                    //не зарегистрирован
                    console.log("Зарегистрируйтесь!", user?.id)
                    navigate("/add-worker")
                }
            }
        }

        fetchData()   
    });

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Меню', icon: 'false'}}/>

            {/* <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style22'/>  */}
            {/* <img src={FonTest} alt='' style={{width:"100%", position: 'absolute', left: '0'}} />  */}

            {/* темный фон */}
            <img src={isScreenLg ? FonTest03 : (isScreenMd ? FonTest02 : FonTest01)} alt='' style={{width:"100%", position: 'absolute', left: '0'}} />
            
            {/* фон с градиентом */}
            <img src={isScreenLg ? FonTest13 : (isScreenMd ? FonTest12 : FonTest11)} alt='' style={{width:"100%", position: 'absolute', left: '0'}} />
            

            {/* фон с градиентом */}
            <img src={isScreenLg ? FonTest23 : (isScreenMd ? FonTest22 : FonTest21)} alt='' className='fon-style0' />
        
            

            <div className='menu-form'>
                <Link to={'/profile'}><ButtonStatus>Профиль</ButtonStatus></Link> 
                <Link to={'/projects'}><ButtonStatus>Проекты</ButtonStatus></Link>  
                <Link to={'/page3'}><ButtonStatus>Смета</ButtonStatus></Link>  
                <ButtonStatus role="link" onClick={() => openInNewTab('https://t.me/ULEY_Office_Bot')}>Офис</ButtonStatus> 
                <Link to={'/stavki'}><ButtonStatus>Ставки</ButtonStatus></Link>
                <Link to={'/info'}><ButtonStatus>Информация</ButtonStatus></Link>   
                <Link to={'/faq'}><ButtonStatus>FAQ</ButtonStatus></Link>  
                <Link to={'/contacts'}><ButtonStatus>Контакты</ButtonStatus></Link>
            </div>
             
        </div>
    );
};


export default MenuPage;