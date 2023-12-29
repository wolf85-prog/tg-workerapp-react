import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { useResize } from './../../hooks/useResize';
import { useTelegram } from "../../hooks/useTelegram";
import './LoadPage.css';
import { useUsersContext } from "../../contexts/UserContext"

import logo from '../../image/logo.gif'

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/layers/ULEY_triangle.png";
import Logo from "../../image/logo_04_light.png";
import Logo2 from "../../image/workhub.png";


const LoadPage = () => {
    const {tg, user} = useTelegram();
    const navigate = useNavigate();

    const [showLogo, setShowLogo] = useState(false);
    const [showLogo2, setShowLogo2] = useState(false);

    const { workerhub: worker } = useUsersContext();

    const { width, isScreenSm, isScreenMd, isScreenLg, } = useResize();
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        //setTimeout(() =>  navigate("/hello"), 7000)
        setTimeout(() =>  navigate("/profile"), 7000)
    }, []);

    useEffect(()=>{
        tg.expand() //раскрыть приложение на всю высоту
    }, [])


    return (
        <div className="App" style={{display: 'flex', height: '100vh'}}>
            <img src={logo} alt="loading..." width='100%' />
        </div>
    );
};

export default LoadPage;