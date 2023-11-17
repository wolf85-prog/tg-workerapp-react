import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewStavka.css';
import CurrencyInput from './../../common/CurrencyInput'

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
    const { id } = useParams();
    const navigate = useNavigate();
    const {tg, queryId, user} = useTelegram();

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    const [summaStavki, setSummaStavki] = useState()
    const [pretendentId, setPretendentId] = useState()

    //const pretId = props.match.params.id


    // const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх 

        setPretendentId(id)
    })


    const changeSummaStavki = (e) => {
        console.log(e.target.value)

        setSummaStavki(e.target.value)
    }

    //отправка данных в telegram-бот
    const onSendData = useCallback(() => {
        const data = {
            summaStavki,
            id,
            queryId,
        }

        tg.MainButton.hide();

        fetch(API_URL + 'web-stavka', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
              
    }, [summaStavki, id])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить предложение',
            color: '#000000' //'#2e2e2e'
        })
    }, [])

    useEffect(() => {
        if (summaStavki) {
           tg.MainButton.show(); 
        } else {
            tg.MainButton.hide();  
        }
        
    }, [summaStavki])



    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моё предложение', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            <div style={{display: 'flex', height: '100vh', position: 'fixed', width: '100%'}}>
                <div className='form-edit-stavka'>

                    <div className="edit-send" style={{ backgroundImage: `url(${enterSumma})`}}>
                        <CurrencyInput 
                            placeholder='Впиши сюда сумму'
                            type="text"
                            value={summaStavki}
                            onChange={changeSummaStavki}  
                        />
                    </div>
        
                    {/* <button onClick={sendStavka} className="button-send" style={{ backgroundImage: `url(${buttonSend})`}}>Отправить предложение</button> */}
                </div>
            </div>

            <div style={{position: 'fixed', bottom: '25px', right: '0'}}>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '25px', width: '120px'}} />
            </div>

        </div>
    );
};


export default NewStavka;