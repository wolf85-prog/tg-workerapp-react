import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import './LoadPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
import Logo from "../../image/logo_04_light.png";
import Logo2 from "../../image/workhub.png";


const LoadPage = () => {

    const navigate = useNavigate();

    const [showNext, setShowNext] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const [showLogo2, setShowLogo2] = useState(false);
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowLogo(true), 1000) //U.L.E.Y.
        setTimeout(() =>  setShowLogo2(true), 3000) // WORKHUB

        //setTimeout(() =>  setShowLogo(false), 5000)
        //setTimeout(() =>  setShowLogo2(false), 5000)

       //setTimeout(() =>  navigate("/add-worker"), 6000)
    }, []);


    return (
        <div className="App">

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>
            {/* <img src={Logo} alt='' className='fon-style3' style={{display: showLogo ? "block": "none"}}/>
            <img src={Logo2} alt='' className='fon-style4' style={{display: showLogo2 ? "block": "none"}}/> */}
            <img src={Logo} alt='' className='fon-style3' />
            <img src={Logo2} alt='' className='fon-style4' />
            
        </div>
    );
};

export default LoadPage;