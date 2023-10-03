import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import ButtonStatus from "../../components/UI/ButtonStatus/ButtonStatus";
import './MenuPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../../hooks/useTelegram";
import { useUsersContext } from "../../contexts/UserContext"
import { getWorkerId } from '../../http/chatAPI';

const MenuPage = () => {
    const {user} = useTelegram();
    const navigate = useNavigate();

    const { setProjects, projects } = useUsersContext();
    const { setSpecId } = useUsersContext();
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        const fetchData = async() => { 
            const worker = await getWorkerId(user?.id) //'805436270' user?.id

            if (worker.length > 0) {

                setSpecId(worker[0]?.id)

            } else {
                console.log("Зарегистрируйтесь!", user?.id)
                navigate("/add-worker")
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

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 
            <div className='menu-form'>
                <Link to={'/profile'}><ButtonStatus>Профиль</ButtonStatus></Link> 
                <Link to={'/projects'}><ButtonStatus>Проекты</ButtonStatus></Link>  
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