import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { useResize } from './../../hooks/useResize';
import { useTelegram } from "../../hooks/useTelegram";
import './LoadPage.css';
import { useUsersContext } from "../../contexts/UserContext"

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
        setTimeout(() =>  setShowLogo(true), 1000) //U.L.E.Y.
        setTimeout(() =>  setShowLogo2(true), 2000) // WORKHUB

        setTimeout(() =>  setShowLogo(false), 7000)
        setTimeout(() =>  setShowLogo2(false), 7000)

        setTimeout(() =>  navigate("/hello"), 7000)
    }, []);

    useEffect(()=>{
        tg.expand() //раскрыть приложение на всю высоту
    }, [])


    return (
        <div className="App" style={{display: 'flex', height: '100vh'}}>
            <img src={BlackFon} alt='' className='fon-black' />

            <div style={{position: 'relative', margin: 'auto', zIndex: '10'}}>
                <img src={Logo} alt='' className='fon-style3' style={{visibility: showLogo ? "visible": "hidden"}}/>
                <img src={Logo2} alt='' className='fon-style4' style={{visibility: showLogo2 ? "visible": "hidden"}}/> 
            </div>
            
        </div>
    );
};

export default LoadPage;