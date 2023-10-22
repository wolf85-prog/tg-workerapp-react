import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import './LoadPage.css';
import Fon from "../../image/logo_01_light.png";
//import FonGrad from "../../image/gradient2.png";
import Logo from "../../image/logo_04_light.png";
import Logo2 from "../../image/workhub.png";

import FonTest from "../../image/back3.jpg";


const LoadPage = () => {

    const navigate = useNavigate();

    const [showLogo, setShowLogo] = useState(false);
    const [showLogo2, setShowLogo2] = useState(false);
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowLogo(true), 1000) //U.L.E.Y.
        setTimeout(() =>  setShowLogo2(true), 2000) // WORKHUB

        setTimeout(() =>  setShowLogo(false), 7000)
        setTimeout(() =>  setShowLogo2(false), 7000)

        setTimeout(() =>  navigate("/hello"), 7000)
    }, []);


    return (
        <div className="App">

            {/* <img src={Fon} alt='' className='fon-style'/> */}
            {/* <img src={FonGrad} alt='' className='fon-style2'/> */}

            <img src={FonTest} alt='' style={{width:"100%", position: 'absolute', left: '0'}} />

            <img src={Logo} alt='' className='fon-style3' style={{visibility: showLogo ? "visible": "hidden"}}/>
            <img src={Logo2} alt='' className='fon-style4' style={{visibility: showLogo2 ? "visible": "hidden"}}/>

        </div>
    );
};

export default LoadPage;