import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { useResize } from '../../hooks/useResize';
import { useTelegram } from "../../hooks/useTelegram";
import './LoadPage2.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/layers/ULEY_triangle.png";
import Logo from "../../image/logo_04_light.png";
import Logo2 from "../../image/workhub.png";


const LoadPage2 = () => {
    const {tg, user} = useTelegram();
    const navigate = useNavigate();

    const [showLogo, setShowLogo] = useState(false);
    const [showLogo2, setShowLogo2] = useState(false);
    //const [showLogo3, setShowLogo3] = useState(false);

    const { width, isScreenSm, isScreenMd, isScreenLg, } = useResize();
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        setTimeout(() =>  navigate("/profile"), 500)
    }, []);

    useEffect(()=>{
        tg.expand() //раскрыть приложение на всю высоту
    }, [])


    return (
        <div className="App" style={{display: 'flex', height: '100vh'}}>
            <img src={BlackFon} alt='' className='fon-black' />

            {/* <div style={{position: 'relative', margin: 'auto', zIndex: '10'}}>
                <img src={Logo} alt='' className='fon-style3' style={{visibility: showLogo ? "visible": "hidden"}}/>
                <img src={Logo2} alt='' className='fon-style4' style={{visibility: showLogo2 ? "visible": "hidden"}}/> 
            </div> */}
            
        </div>
    );
};

export default LoadPage2;