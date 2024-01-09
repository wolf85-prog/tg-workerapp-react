import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './NewPassport.css';

import { useUsersContext } from "../../contexts/UserContext";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import InputMask from 'react-input-mask';
import Calendar from "../../image/calendar.svg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";

import BlackFon from "../../image/new/fon_grad.svg";

const API_URL = process.env.REACT_APP_API_URL

const NewPassport = () => {
    const navigate = useNavigate();

    const {tg, user, queryId} = useTelegram();

    const { 
        pasFam, setPasFam, 
        pasName, setPasName, 
        pasSoname, setPasSoname, 
        pasDateborn, setPasDateborn 
    } = useUsersContext();

    const [famDirty, setFamDirty] = useState(false)
    const [nameDirty, setNameDirty] = useState(false)
    const [datebornDirty, setDatebornDirty] = useState(false)
    const [error, setError] = useState("")

    const pressNext = () => {      
        if (pasFam && pasName && pasDateborn.length === 10) {
            console.log('да')

            navigate('/add-passport2')

        } else {
            console.log('нет')

            if (!pasFam) {
                setError('Заполните выделенные поля!')
                setFamDirty(true) 
            } else {
                setFamDirty(false)   
            }

            if (!pasName) {
                setError('Заполните выделенные поля!')
                setNameDirty(true) 
            } else {
                setNameDirty(false)   
            }

            //if (!pasDateborn || pasDateborn === '2000-01-01') {
            if (pasDateborn.length !== 10) {
                setError('Заполните выделенные поля!')
                setDatebornDirty(true) 
            } else {
                setDatebornDirty(false)   
            }

            // setError('Заполните выделенные поля!')
            // if (!pasFam) setFamDirty(true)
            // if (!pasName) setNameDirty(true)
            // if (!pasDateborn || pasDateborn === '2000-01-01') {
            //     setDatebornDirty(true)
            // }
        }
    }

    const onChangeFamily = (e) => {
        setPasFam(e.target.value)

        // const re= /^[а-яА-Я]+$/;
        // if (!re.test(String(e.target.value).toLowerCase())) {
        //     setFamError('Некорректная фамилия')
        // } else {
        //     setFamError("")
        // }
    }

    const onChangeName = (e) => {
        setPasName(e.target.value)
    }

    const onChangeSoname = (e) => {
        setPasSoname(e.target.value)
    }

    const onChangeTime = (e) => {
        setPasDateborn(e.target.value)
    }

    const onClose = () => {
        tg.close()
    }

    useEffect(()=>{
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#343A41') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])

    useEffect(() => {
        tg.onEvent("backButtonClicked", onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, [onClose])

    useEffect(() => {
        tg.BackButton.show();
    }, [])

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моя аккредитация', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />


            {/* Предупреждение */}
            <div style={{
                        visibility: (error && !pasFam || !pasName || pasDateborn.length !== 10) ? 'visible' : 'hidden',
                        color: 'red', 
                        fontSize: '18px',    
                        position: 'absolute',
                        top: 'calc(20vh - 25px)',
                        width: '100%',
                    }}>{error}
            </div>

            <div style={{display: 'flex', justifyContent: 'space-around', height: '100vh', padding: '0 25px'}}>            
                
                <div style={{width: '100%', marginTop: '40px'}}> 

                    <div className="header-fio">
                        <p>ФИО</p>
                        <p>Шаг 1/3</p>
                    </div>

                    {/*Фамилия*/}
                    <div style={{position: 'relative', marginTop: '20px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <input
                            className='input-style3'
                            placeholder='Фамилия'
                            name='fam'
                            id="pas_family"
                            onChange={onChangeFamily}
                            value={pasFam}
                            style={{border: famDirty ? '1px solid #ff0000' : ''}}
                        />
                    </div>

                    {/* Имя */}
                    <div style={{position: 'relative', marginTop: '20px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <input
                            className='input-style3'
                            placeholder='Имя'
                            id="pas_name"
                            name='name'
                            onChange={onChangeName}
                            value={pasName}
                            style={{border: nameDirty ? '1px solid #ff0000' : ''}}
                        /> 
                    </div>
                     

                    {/* Отчество */}
                    <div style={{position: 'relative', marginTop: '20px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <input
                            className='input-style3'
                            placeholder='Отчество'
                            id="pas_soname"
                            onChange={onChangeSoname}
                            value={pasSoname}
                        /> 
                    </div>
                    

                    {/* Дата начала */}
                    {/* <div style={{position: 'absolute', top: '224px', left: '64px'}}> */}
                       {/* <input
                            className='input-style2'
                            placeholder='Дата рождения'
                            id="date"
                            name='date'
                            // type="date"
                            // value={pasDateborn}
                            onChange={onChangeTime}
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
                            value={pasDateborn}
                            onChange={onChangeTime} 
                            placeholder='Дата рождения'
                            id="date"
                            name='date'
                            style={{border: datebornDirty ? '1px solid #ff0000' : ''}}
                        >
                        </InputMask>
                    </div>
                        
                    <div className='block-button' style={{padding: '0'}}>
                        <div className='button1' onClick={()=>navigate('/anketa')}>Назад</div>
                        <div className='button2' onClick={pressNext}>Далее</div>
                    </div>  
                </div>  



                {/*Сколько лет*/}
                {/*Дата начала*/}
                {/* <div className="text-field text-field_floating">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} style={{backgroundColor: '#2A2731', borderRadius: '10px'}}>
                            {datebornDirty ? <RedditTextFieldNovalid
                                id="date"
                                label="Дата рождения"
                                name='date'
                                type="date"
                                variant="filled"
                                value={pasDateborn}
                                onChange={onChangeTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            :<RedditTextField
                                id="date"
                                label="Дата рождения"
                                name='date'
                                type="date"
                                variant="filled"
                                value={pasDateborn}
                                onChange={onChangeTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />}
                            <span className="open-button">
                              <button type="button"><img src={Calendar} alt='calendar'/></button>
                            </span>
                        </Stack>
                    </LocalizationProvider>
                </div> */}
            </div>
            
        </div>
    );
};


export default NewPassport;