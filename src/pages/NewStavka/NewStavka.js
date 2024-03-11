import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewStavka.css';
import CurrencyInput from './../../common/CurrencyInput'

import BlackFon from "../../image/new/fon_grad.svg";

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

import InputMask from 'react-input-mask';

import { useWindowDimensions } from "../../hooks/useWindowDimensions";


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

    const { height, width } = useWindowDimensions();
    const [widthD, setWidthD] = useState(0)

    //const pretId = props.match.params.id


    // const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");

//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setPretendentId(id)
    }, [])


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
            userId: user?.id,
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


    useEffect(()=>{
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#26292c') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])

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
            <img src={BlackFon} alt='' className='fon-black' style={{left: `${widthD}px`, zIndex: '1'}} />

            <div style={{height: '100vh', marginTop: '50%'}}>
                <div className='form-edit-stavka'>
                    
                    <div className='rec1-input'></div>
                    <div className='rec2-input'></div>
                    <div className='rec3-input'></div>
                        <CurrencyInput
                            className='input-style3'
                            placeholder='Впиши сюда сумму'
                            type="text"
                            value={summaStavki}
                            onChange={changeSummaStavki} 
                        /> 
    
                </div>
            </div>

        </div>
    );
};


export default NewStavka;