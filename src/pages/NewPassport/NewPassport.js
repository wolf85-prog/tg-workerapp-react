import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPassport.css';

import { useUsersContext } from "../../contexts/UserContext";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import InputMask from 'react-input-mask';
import Calendar from "../../image/calendar.svg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import FonGradWhite from "../../image/layers/grad_white.png";
import btnNextSend from "../../image/newpassport/button_next_send.png"

import smallMenu from "../../image/layers/logo_04_light.png"

const API_URL = process.env.REACT_APP_API_URL

const NewPassport = () => {
    const navigate = useNavigate();

    const {user} = useTelegram();

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

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)


    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх 
    })

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



    //---------------------------------------------------------------------------------------


    return (
        <div className="App">
            <Header header={{title: 'Моя анкета', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            {/* белый градиент */}
            <div  style={{display: 'flex', height: '100vh', position: 'absolute', zIndex: '2'}}>
                <img src={FonGradWhite} alt='' className='fon-style-white'/>
            </div>

            {/* Предупреждение */}
            <div style={{
                        visibility: (error && !pasFam || !pasName || pasDateborn.length !== 10) ? 'visible' : 'hidden',
                        color: 'red', 
                        fontSize: '18px',    
                        position: 'absolute',
                        top: 'calc(30vh - 25px)',
                        width: '100%',
                    }}>{error}
            </div>

            <div style={{display: 'flex', height: '100vh', padding: '0 25px'}}>            
                
                {/* Чёрная плашка */}
                <div className='form-new-passport'>  
                    {/* <p style={{
                            marginTop: '-35px', 
                            visibility: (error && !pasFam || !pasName || pasDateborn.length !== 10) ? 'visible' : 'hidden',
                            color: 'red', 
                            fontSize: '18px',
                        }}>
                        {error}
                    </p> */}
                    {/*Фамилия*/}
                    <div style={{position: 'relative', 
                            marginTop: '31px', 
                            marginLeft: '25px', 
                            marginRight: '25px'}}>
                        <input
                            className='input-style2'
                            placeholder='Фамилия'
                            name='fam'
                            id="pas_family"
                            onChange={onChangeFamily}
                            value={pasFam}
                            style={{border: famDirty ? '1px solid #ff0000' : ''}}
                        />  
                    </div> 

                    {/* Имя */}
                    <div style={{position: 'relative', marginLeft: '25px', marginRight: '25px'}}>
                       <input
                            className='input-style2'
                            placeholder='Имя'
                            id="pas_name"
                            name='name'
                            onChange={onChangeName}
                            value={pasName}
                            style={{border: nameDirty ? '1px solid #ff0000' : ''}}
                        /> 
                    </div>
                     

                    {/* Отчество */}
                    <div style={{position: 'relative', marginLeft: '25px', marginRight: '25px'}}>
                        <input
                            className='input-style2'
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
                    <div style={{position: 'relative', marginLeft: '25px', marginRight: '25px'}}>
                        <InputMask
                            mask="99.99.9999"
                            disabled={false}
                            maskChar=""
                            value={pasDateborn}
                            onChange={onChangeTime} 
                            className='input-style2'
                            placeholder='Дата рождения'
                            id="date"
                            name='date'
                            style={{border: datebornDirty ? '1px solid #ff0000' : ''}}
                        >
                        </InputMask>
                    </div>
                        
                    {/* </div>      */}

                    {/* <div className='block-buttons-newpas1'> */}
                        <button 
                            // disabled={disabledBtn}
                            className="image-button-pas" 
                            style={{ backgroundImage: `url(${btnNextSend})`}}
                            onClick={pressNext}
                        >
                            Далее
                        </button>
                    {/* </div> */}
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
            
            <div style={{position: 'fixed', bottom: '25px', right: '0'}}>
                <img src={smallMenu} alt='' className='small-menu-icon' />
            </div>
        </div>
    );
};


export default NewPassport;