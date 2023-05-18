import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewWorker3.css';
import Calendar from "../../image/calendar.svg";

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";

import InputMask from 'react-input-mask';

const API_URL = process.env.REACT_APP_API_URL

const NewWorker2 = () => {
    const {tg, queryId, user} = useTelegram();

    const [worker, setWorker] = useState('');
    const [dateborn, setDateborn] = useState('2000-01-01');
    const [phone, setPhone] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const onChangeTime = (e) => {
        setDateborn(e.target.value)
    }


    return (
        <div className="App">
            <Header header={{title: 'Новый специалист', icon: 'false'}}/>

            <form>
                

                {/*Город*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     label="Ваш город"
                                     id="worker_name"
                                     variant="filled"

                    />
                </div>

                {/*Сколько лет*/}
                {/*Дата начала*/}
                <div className="text-field text-field_floating">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} style={{backgroundColor: '#2A2731', borderRadius: '10px'}}>
                            <RedditTextField
                                id="date"
                                label="Дата рождения"
                                type="date"
                                variant="filled"
                                value={dateborn}
                                onChange={onChangeTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <span className="open-button">
                              <button type="button"><img src={Calendar} alt='calendar'/></button>
                            </span>
                        </Stack>
                    </LocalizationProvider>
                </div>

                <div className='block-buttons'>
                    <Link to={'/'}><MyButton style={{width: "80px"}}>Назад</MyButton></Link>
                    <Link to={'/add-worker4'}><MyButton style={{width: "80px"}}>Далее</MyButton></Link> 
                </div>
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


export default NewWorker2;