import React from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewWorker.css';
import Fon from "../../image/logo_01_light.png";

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

import InputMask from 'react-input-mask';

import { useUsersContext } from "./../../contexts/UserContext";

const NewWorker = () => {

    const { workerFam, setWorkerFam, workerName, setWorkerName, phone, setPhone } = useUsersContext();

    const onChangeFamily = (e) => {
        setWorkerFam(e.target.value)
    }

    const onChangeName = (e) => {
        setWorkerName(e.target.value)
    }

    const handlePhone = (e)=>{
        setPhone(e.target.value)
    }

    return (
        <div className="App">
            <Header header={{title: 'Новый специалист', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>

            <form>
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
                        maskChar=" "
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

                <Link to={'/add-worker'}><MyButton style={{marginBottom: "15px", width: "220px"}}>Далее</MyButton></Link>

            </form>
            
        </div>
    );
};

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props}  />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '2px solid #76A9FF',
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


export default NewWorker;