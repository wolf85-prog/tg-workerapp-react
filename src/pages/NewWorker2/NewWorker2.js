import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewWorker2.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import smallMenu from "../../image/layers/ULEY text.png"

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

import InputMask from 'react-input-mask';

import { useUsersContext } from "./../../contexts/UserContext";

const NewWorker2 = () => {

    const { workerFam, setWorkerFam, workerName, setWorkerName, phone, setPhone } = useUsersContext();
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    const [novalid, setNovalid] = useState(true)

    useEffect(() => {
        //console.log(phone.length)
        if (workerFam && workerName && phone.length === 18) {
            setNovalid(false)
        } else {
            setNovalid(true) 
        }
    }, [workerFam, workerName, phone]);

    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    })

    const onChangeFamily = (e) => {
        setWorkerFam(e.target.value)
    }

    const onChangeName = (e) => {
        setWorkerName(e.target.value)
    }

    const handlePhone = (e)=>{
        setPhone(e.target.value)
        //console.log(phone.length)
    }

    return (
        <div className="App">
            <Header header={{title: 'Новый специалист', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>


            <div className='form-new2'>
                {/*Фамилия*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                    label="Фамилия"
                                    id="worker_soname"
                                    variant="filled"
                                    onChange={onChangeFamily}
                                    value={workerFam}
                    />
                </div>

                {/*Имя*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                    label="Имя"
                                    id="worker_name"
                                    variant="filled"
                                    onChange={onChangeName}
                                    value={workerName}
                    />
                </div>          

                {/*Номер телефона*/}
                <div className="text-field text-field_floating">
                    <InputMask
                        mask="+7 (999) 999-99-99"
                        disabled={false}
                        maskChar=""
                        onChange={handlePhone} 
                        value={phone}
                    >
                        {() => <RedditTextField 
                                    fullWidth 
                                    label="Номер телефона"
                                    id="worker_phone"
                                    variant="filled"/>}
                    </InputMask>
                </div>

                <div className='block-buttons-new2'>
                    <Link to={'/add-worker'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton></Link>
                    <Link to={'/add-worker3'}><MyButton disabled={novalid} style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Далее</MyButton></Link>
                </div>

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


export default NewWorker2;