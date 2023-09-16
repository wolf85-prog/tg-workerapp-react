import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import './LoadPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
import Logo from "../../image/logo_04_light.png";


const LoadPage = () => {

    const navigate = useNavigate();

    const [showNext, setShowNext] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [showLogo, setShowLogo] = useState(false);

//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowLogo(true), 1000)
        setTimeout(() =>  setShowLogo(false), 5000)
        setTimeout(() =>  navigate("/add-worker"), 5000)
    }, []);


    return (
        <div className="App">

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>
            <img src={Logo} alt='' className='fon-style3' style={{display: showLogo ? "block": "none"}}/>
            
            
        </div>
    );
};

export default LoadPage;