import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import './LoadPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";


const LoadPage = () => {

    const navigate = useNavigate();

    const [showNext, setShowNext] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  navigate("/add-worker"), 3000)
    }, []);


    return (
        <div className="App">

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>
            
        </div>
    );
};

export default LoadPage;