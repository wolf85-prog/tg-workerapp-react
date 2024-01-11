import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPassport2.css';

import BlackFon from "../../image/new/fon_grad.svg";

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import InputMask from 'react-input-mask';
import Calendar from "../../image/calendar.svg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";
import { useUsersContext } from "../../contexts/UserContext";

const NewPassport2 = () => {
    const {tg, user, queryId} = useTelegram();
    const navigate = useNavigate();

    const { 
        pasNumber, 
		setPasNumber,
		pasDate, 
		setPasDate,
		pasKem, 
		setPasKem,
		pasKod, 
		setPasKod
    } = useUsersContext();

    const [numDirty, setNumDirty] = useState(false)
    const [dateDirty, setDateDirty] = useState(false)
    const [kemDirty, setKemDirty] = useState(false)
    const [kodDirty, setKodDirty] = useState(false)

    const [error, setError] = useState("")

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    const pressNext = () => {  

        console.log("dateDirty: ", dateDirty)

        if (pasNumber.length === 11 && pasDate.length === 10 && pasKem && pasKod.length === 7) {
            console.log('да')
            navigate('/add-passport3')
        } else {  
            console.log("нет")        
            if (pasNumber.length !== 11) {
                setError('Заполни выделенные поля!')
                setNumDirty(true) 
            } else {
                setNumDirty(false)   
            } 

            //if (!pasDate || pasDate === '2000-01-01') {
            if (pasDate.length !== 10) {
                setDateDirty(true)
            } else {
                setDateDirty(false)
            }

            if (pasKem.length === 0) {
                setError('Заполни выделенные поля!')
                setKemDirty(true)
            } else {
                setKemDirty(false)  
            }

            if (pasKod.length !== 7) {
                setError('Заполни выделенные поля!')
                setKodDirty(true)
            } else {
                setKodDirty(false)  
            }
        }
    }

    const handleNumber = (e)=>{
        setPasNumber(e.target.value)
    }

    const handleDate = (e)=>{
        setPasDate(e.target.value)
    }

    const handleKem = (e)=>{
        setPasKem(e.target.value)
    }

    const handleKod = (e)=>{
        setPasKod(e.target.value)
    }

    useEffect(()=>{
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#26292c') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])

    const onClose = () => {
        tg.close()
    }

    useEffect(() => {
        tg.onEvent("backButtonClicked", onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, [onClose])

    useEffect(() => {
        tg.BackButton.show();
    }, [])

    return (
        <div className="App">
            <Header header={{title: 'Моя аккредитация', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
        
            {/* Предупреждение */}
            <div style={{
                        visibility: (error && pasNumber.length !== 11 || pasDate === '2000-01-01' || !pasKem || pasKod.length !==7) ? 'visible' : 'hidden',
                        color: 'red', 
                        fontSize: '18px',
                        position: 'absolute',
                        top: '70px',
                        width: '100%',
                    }}>{error}
            </div>

            <div style={{display: 'flex', height: '100vh', padding: '0 25px'}}>            

                <div style={{width: '100%', marginTop: '40px'}}>
                    <div className="header-fio">
                        <p>Паспорт</p>
                        <p>Шаг 2/3</p>
                    </div>

                    {/*Серия и номер*/}
                    <div style={{position: 'relative', marginTop: '20px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <InputMask
                            className='input-style3'
                            mask="9999 999999"
                            disabled={false}
                            maskChar=""
                            onChange={handleNumber} 
                            value={pasNumber}
                            placeholder='Серия и номер'
                            style={{border: numDirty ? '1px solid #ff0000' : ''}}
                        >  
                        </InputMask>
                    </div> 

                    {/* Дата выдачи */}
                    {/* <input
                        className='input-style2'
                        placeholder='Дата выдачи'
                        id="pas_date"
                        label="Дата выдачи"
                        type="date"
                        value={pasDate}
                        onChange={handleDate}
                        style={{border: dateDirty ? '1px solid #ff0000' : ''}}
                    />  */}
                    <div style={{position: 'relative', marginTop: '20px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <InputMask
                            className='input-style3'
                            mask="99.99.9999"
                            disabled={false}
                            maskChar=""
                            onChange={handleDate}
                            value={pasDate}
                            style={{border: dateDirty ? '1px solid #ff0000' : ''}}
                            placeholder='Дата выдачи'
                            id="pas_date"
                            name='pas_date'
                        >
                        </InputMask>
                    </div>
                    
                    {/* Кем выдан */}
                    <div style={{position: 'relative', marginTop: '20px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <input
                            className='input-style3'
                            placeholder="Кем выдан"
                            id="pas_kem"
                            name='kem'
                            onChange={handleKem}
                            value={pasKem}
                            style={{border: kemDirty ? '1px solid #ff0000' : ''}}
                        /> 
                    </div> 

                    {/* Код подразделения */}
                    <div style={{position: 'relative', marginTop: '20px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <InputMask
                            className='input-style3'
                            mask="999-999"
                            disabled={false}
                            placeholder='Код подразделения'
                            maskChar=""
                            onChange={handleKod} 
                            value={pasKod}
                            style={{border: kodDirty ? '1px solid #ff0000' : ''}}
                        />
                    </div>    

                    <div className='block-button' style={{padding: '0'}}>
                        <div className='button1' onClick={()=>navigate(-1)}>Назад</div>
                        <div className='button2' onClick={pressNext}>Далее</div>
                    </div> 
                </div>
            </div>     
        </div>
    );
};


export default NewPassport2;