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

import smallMenu from "../../image/layers/ULEY text.png"

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
            <Header header={{title: 'Новая ставка', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            <div className='form-new1'>

                {/*Номер телефона*/}
                <div className="text-field text-field_floating">
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
                </div>

                

                <MyButton style={{marginBottom: "15px", width: "220px"}}>Сохранить</MyButton>    
            </div>

            <div style={{position: 'fixed', bottom: '25px', right: '0'}}>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '25px', width: '120px'}} />
            </div>
        </div>
    );
};

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props}  />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        height: '55px',
        border: '2px solid #2e7cff',
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}));


export default NewStavka;