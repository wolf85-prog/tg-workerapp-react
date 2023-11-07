import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewStavka.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"

import enterSumma from "../../image/buttons/enter_summa.png"
import buttonSend from "../../image/buttons/button_send_predlog.png"

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

import InputMask from 'react-input-mask';


//import TextField from '@mui/material/TextField';
//import { alpha, styled } from '@mui/material/styles';
import specData from "../../data/specData"
import { useUsersContext } from "../../contexts/UserContext";
import { sendMyMessage } from '../../http/chatAPI';

const API_URL = process.env.REACT_APP_API_URL

const NewStavka = () => {
    const navigate = useNavigate();

    const {user} = useTelegram();

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    })


    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моё предложение', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            <div style={{display: 'flex', height: '100vh', position: 'fixed', width: '100%'}}>
                <div className='form-edit-stavka'>

                    {/*Номер телефона*/}
                    {/* <div className="text-field text-field_floating">
                        <InputMask
                            mask="9999.99"
                            disabled={false}
                            maskChar=""
                            onChange={()=>console.log('sdf')} 
                        >
                            {() => <RedditTextField 
                                        fullWidth 
                                        label="Сумма"
                                        id="worker_phone"
                                        variant="filled"/>}
                        </InputMask>
                    </div> */}

                    <div className="edit-send" style={{ backgroundImage: `url(${enterSumma})`}}>
                        <InputMask
                            mask="9999.00"
                            disabled={false}
                            maskChar=""
                            onChange={()=>console.log('sdf')} 
                            placeholder='Впишите сюда сумму'
                        >
            
                        </InputMask>
                    </div>
        
                    <button className="button-send" style={{ backgroundImage: `url(${buttonSend})`}}>Отправить предложение</button>
                </div>
            </div>

            <div className='footer-block' style={{bottom: '0'}}>
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>
        </div>
    );
};


export default NewStavka;