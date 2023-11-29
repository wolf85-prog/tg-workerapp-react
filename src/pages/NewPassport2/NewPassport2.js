import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPassport2.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";
import FonGradWhite from "../../image/layers/grad_white.png";
import smallMenu from "../../image/layers/ULEY text.png"
import btnNextSend from "../../image/newpassport/button_next_send.png"
import btnBack from "../../image/newpassport/icon_back.png"

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import InputMask from 'react-input-mask';
import Calendar from "../../image/calendar.svg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";
import { useUsersContext } from "../../contexts/UserContext";

const NewPassport2 = () => {

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


    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх 
    })

    const pressNext = () => {  

        console.log("dateDirty: ", dateDirty)

        if (pasNumber.length === 11 && pasDate.length === 10 && pasKem && pasKod.length === 7) {
            console.log('да')
            navigate('/add-passport3')
        } else {  
            console.log("нет")        
            if (pasNumber.length !== 11) {
                setError('Заполните выделенные поля!')
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
                setError('Заполните выделенные поля!')
                setKemDirty(true)
            } else {
                setKemDirty(false)  
            }

            if (pasKod.length !== 7) {
                setError('Заполните выделенные поля!')
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

            {/* {(error && pasNumber !== 11 || pasDate === '2000-01-01' || !pasKem || pasKod.length !==7) && 
                <div style={{
                    color: 'red', 
                    fontSize: '18px',
                    position: 'absolute', 
                    left: '0', 
                    top: '70px', 
                    right: '0', 
                    marginLeft: 'auto', 
                    marginRight: 'auto'}}>
                        {error}
                </div>
            } */}

            {/* белый градиент */}
            <div  style={{display: 'flex', height: '100vh', position: 'absolute', zIndex: '2'}}>
                <img src={FonGradWhite} alt='' className='fon-style-white'/>
            </div>

            {/* Предупреждение */}
            <div style={{
                        visibility: (error && pasNumber.length !== 11 || pasDate === '2000-01-01' || !pasKem || pasKod.length !==7) ? 'visible' : 'hidden',
                        color: 'red', 
                        fontSize: '18px',
                        position: 'absolute',
                        top: 'calc(30vh - 25px)',
                        width: '100%',
                    }}>{error}
            </div>

            <div style={{display: 'flex', height: '100vh', padding: '0 25px', overflow: 'auto'}}>            
                {/* Чёрная плашка */}
                <div className='form-new-passport'>
                    {/*Серия и номер*/}
                    <div style={{position: 'relative', marginTop: '30px', marginLeft: '25px', marginRight: '25px'}}>
                        <InputMask
                            className='input-style2'
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
                    <div style={{marginLeft: '25px', marginRight: '25px'}}>
                        <InputMask
                            mask="99.99.9999"
                            disabled={false}
                            maskChar=""
                            onChange={handleDate}
                            value={pasDate}
                            style={{border: dateDirty ? '1px solid #ff0000' : ''}}
                            className='input-style2'
                            placeholder='Дата выдачи'
                            id="pas_date"
                            name='pas_date'
                        >
                        </InputMask>
                    </div>
                    
                    {/* Кем выдан */}
                    <div style={{marginLeft: '25px', marginRight: '25px'}}>
                       <input
                            className='input-style2'
                            placeholder="Кем выдан"
                            id="pas_kem"
                            name='kem'
                            onChange={handleKem}
                            value={pasKem}
                            style={{border: kemDirty ? '1px solid #ff0000' : ''}}
                        /> 
                    </div> 

                    {/* Код подразделения */}
                    <div style={{marginLeft: '25px', marginRight: '25px'}}>
                        <InputMask
                            mask="999-999"
                            disabled={false}
                            className='input-style2'
                            placeholder='Код подразделения'
                            maskChar=""
                            onChange={handleKod} 
                            value={pasKod}
                            style={{border: kodDirty ? '1px solid #ff0000' : ''}}
                        />

                    </div>     

                    {/* <div className='block-buttons-newpas1'> */}
                        {/* <MyButton onClick={pressNext} style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Далее</MyButton> */}
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
            </div>    
                
                {/* <div className='form-new-passport' style={{ backgroundImage: `url(${formPassport})`}}>
                    
                    <div style={{position: 'absolute', top: '86px', left: '64px'}}>
                        
                    </div> 


                    <div style={{position: 'absolute', top: '132px', left: '64px'}}>
                       <input
                            className='input-style'
                            placeholder='Имя'
                            id="pas_name"
                            name='name'
                            onChange={onChangeName}
                            value={pasName}
                        /> 
                    </div>   


                    <div style={{position: 'absolute', top: '178px', left: '64px'}}>
                       <input
                            className='input-style'
                            placeholder='Отчество'
                            id="pas_soname"
                            onChange={onChangeSoname}
                            value={pasSoname}
                        /> 
                    </div> 


                    <div style={{position: 'absolute', top: '224px', left: '64px'}}>
                       <input
                            className='input-style'
                            placeholder=''
                            id="date"
                            name='date'
                            type="date"
                            value={pasDateborn}
                            onChange={onChangeTime}
                        /> 
                    </div>     

                    <div className='block-buttons-newpas1'>
                        <button 
                            // disabled={disabledBtn}
                            className="image-button-pas" 
                            style={{ backgroundImage: `url(${btnNextSend})`}}
                            onClick={pressNext}
                        >
                            Далее
                        </button>
                    </div>
                </div>         */}

            

            {/* <div className='form-new2'>
                <div className="text-field text-field_floating">
                    <InputMask
                        mask="9999 999999"
                        disabled={false}
                        maskChar=""
                        onChange={handleNumber} 
                        value={pasNumber}
                    >
                        {() => numDirty ? 
                                <RedditTextFieldNovalid 
                                    fullWidth 
                                    label="Серия и номер"
                                    name='num'
                                    id="pas_number"
                                    variant="filled"/>
                                :<RedditTextField
                                    fullWidth 
                                    label="Серия и номер"
                                    name='num'
                                    id="pas_number"
                                    variant="filled"/>}
                    </InputMask>
                </div> */}

                {/* <div className="text-field text-field_floating">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} style={{backgroundColor: '#2A2731', borderRadius: '10px'}}>
                            {dateDirty ? <RedditTextFieldNovalid
                                id="pas_date"
                                label="Дата выдачи"
                                type="date"
                                variant="filled"
                                value={pasDate}
                                onChange={handleDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            :<RedditTextField
                                id="pas_date"
                                label="Дата выдачи"
                                type="date"
                                variant="filled"
                                value={pasDate}
                                onChange={handleDate}
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

                {/* <div className="text-field text-field_floating">
                    {kemDirty ?
                    <RedditTextFieldNovalid fullWidth
                                    label="Кем выдан"
                                    id="pas_kem"
                                    name='kem'
                                    variant="filled"
                                    onChange={handleKem}
                                    value={pasKem}
                    />
                    :<RedditTextField fullWidth
                                    label="Кем выдан"
                                    id="pas_kem"
                                    name='kem'
                                    variant="filled"
                                    onChange={handleKem}
                                    value={pasKem}
                    />}
                </div>           */}

                {/* <div className="text-field text-field_floating">
                    <InputMask
                        mask="999-999"
                        disabled={false}
                        maskChar=""
                        onChange={handleKod} 
                        value={pasKod}
                    >
                        {() => kodDirty ?
                                <RedditTextFieldNovalid 
                                    fullWidth 
                                    label="Код подразделения"
                                    name='kod'
                                    id="pas_kod"
                                    variant="filled"/>
                                :<RedditTextField 
                                    fullWidth 
                                    label="Код подразделения"
                                    name='kod'
                                    id="pas_kod"
                                    variant="filled"/>}
                    </InputMask>
                </div> */}

                {/* <div className='block-buttons-new2'>
                    <Link to={'/add-passport'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton></Link>
                    <MyButton onClick={pressNext} style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Далее</MyButton>
                </div> */}

                {/* <div style={{position: 'fixed', bottom: '25px', right: '0'}}>
                    <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '25px', width: '120px'}} />
                </div> */}

                <div className='footer-block' style={{position: 'fixed', bottom: '25px', right: '0', zIndex: '2'}}>
                    <Link to={'/add-passport'}><img src={btnBack} alt='' /></Link>
                    <img src={smallMenu} alt='' className='small-menu-icon' />
                </div>

        </div>
    );
};


export default NewPassport2;