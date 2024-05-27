import React, { useState, useEffect, useCallback, useRef } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import MyModal from "../../components/MyModal/MyModal";

import './ErrorPage.css';

import BlackFon from "../../image/new/fon_grad.svg";

const API_URL = process.env.REACT_APP_API_URL

const ErrorPage = () => {
    const {tg, queryId, user} = useTelegram();
    const navigate = useNavigate();

    const [widthD, setWidthD] = useState(0)

    const [showModal, setShowModal] = useState(true)

//----------------------------------------------------------------------------------
    
    return (
        <div className="App">

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            {/* <img src={BlackFon} alt='' className='fon-black' style={{left: `${25 - width}px`, zIndex: '1'}} /> */}
            <img src={BlackFon} alt='' className='fon-black' style={{left: `${widthD}px`, zIndex: '1'}} />

            {/*Специализация*/}   
            <p style={{position: 'absolute', top: '25px', left: '25px', fontSize: '17px', color: '#fff', zIndex: '5'}}>
                Профиль
            </p>


            <MyModal visible={showModal} setVisible={setShowModal}>
                <div className='info-card' style={{height: '220px'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'>Внимание</p>

                    <p className='text-vagno3'>Ведуться технические работы! Попробуйте зайти позже</p>
                
                    <div className='button-ok'>
                        <div className='rec-button' onClick={()=>setShowModal(false)}>Ок</div>        
                    </div>
                </div>
            </MyModal>

        </div>
    );
};


export default ErrorPage;