import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { useResize } from './../../hooks/useResize';
import './LoadPage.css';

import Fon from "../../image/layers/ULEY_triangle.png";
import Logo from "../../image/logo_04_light.png";
import Logo2 from "../../image/workhub.png";


// import FonTest01 from "../../image/background/Background 1.0 _ 320 х 568.png";
// import FonTest02 from "../../image/background/Background 1.0 _ 375 х 598.png";
// import FonTest03 from "../../image/background/Background 1.0 _ 414 х 658.png";

const LoadPage = () => {

    const navigate = useNavigate();

    const [showLogo, setShowLogo] = useState(false);
    const [showLogo2, setShowLogo2] = useState(false);

    const { width, isScreenSm, isScreenMd, isScreenLg, } = useResize();
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowLogo(true), 1000) //U.L.E.Y.
        setTimeout(() =>  setShowLogo2(true), 2000) // WORKHUB

        setTimeout(() =>  setShowLogo(false), 7000)
        setTimeout(() =>  setShowLogo2(false), 7000)

        console.log("width:", width + 'px')
        console.log("isScreenSm:", isScreenSm)
        console.log("isScreenMd:", isScreenMd)
        console.log("isScreenLg:", isScreenLg)

        setTimeout(() =>  navigate("/hello"), 7000)
    }, []);


    return (
        <div className="App">

            {/* <img src={isScreenLg ? FonTest03 : (isScreenMd ? FonTest02 : FonTest01)} alt='' style={{width:"100%", position: 'absolute', left: '0'}} /> */}
            <img src={Fon} alt='' className='fon-style' />

            <img src={Logo} alt='' className='fon-style3' style={{visibility: showLogo ? "visible": "hidden"}}/>
            <img src={Logo2} alt='' className='fon-style4' style={{visibility: showLogo2 ? "visible": "hidden"}}/>

        </div>
    );
};

export default LoadPage;