import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './ProcessPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/BlueLine1.png";
import MyButton from "../../components/UI/MyButton/MyButton";


const ProcessPage = () => {
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 
            
            <form>
                <div style={{marginTop: '350px'}}>                  
                    <p
                        style={{
                            margin: '20px 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '26px',
                            color: '#fff',
                        }}> Пожалуйста, подождите! Процесс регистрации не завершен... 
                    </p>         
                </div> 
            </form>         
        </div>
    );
};


export default ProcessPage;