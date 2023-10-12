import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewWorker2.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

import InputMask from 'react-input-mask';

import { useUsersContext } from "../../contexts/UserContext";

const NewWorker2 = () => {

    const { workerFam, setWorkerFam, workerName, setWorkerName, phone, setPhone } = useUsersContext();

    const [novalid, setNovalid] = useState(true)

    useEffect(() => {
        //console.log(phone.length)
        if (workerFam && workerName && phone.length === 18) {
            setNovalid(false)
        } else {
            setNovalid(true) 
        }
    }, [workerFam, workerName, phone]);

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

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>

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