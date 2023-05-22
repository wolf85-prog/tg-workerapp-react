import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewWorker4.css';
import Calendar from "../../image/calendar.svg";
import Fon from "../../image/logo_01_light.png";

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";

import InputMask from 'react-input-mask';
import { useUsersContext } from "./../../contexts/UserContext";

const API_URL = process.env.REACT_APP_API_URL

const NewWorker4 = () => {
    const {tg, queryId, user} = useTelegram();

    const { workerFam } = useUsersContext();

    const [companys, setCompanys] = useState('');
    const [stag, setStag] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const onChangeStag = (e) => {
        setStag(e.target.value)
    }


     //отправка данных в telegram-бот
     const onSendData = useCallback(() => {
        const data = {
            workerfamily: workerFam,
        }

        tg.MainButton.hide();
        setIsLoading(true)


        fetch(API_URL + 'web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        
        setIsLoading(false)
              
    }, [workerFam])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Сохранить'
        })
    }, [])

    return (
        <div className="App">
            <Header header={{title: 'Новый специалист', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>

            <form>
                {/*Прокатные комапнии*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     style={{borderRadius: '10px'}}
                                     id="outlined-multiline-flexible"
                                     label="Прокатные компании"
                                     variant="filled"
                                     multiline
                                     rows={4}

                    />
                </div>

                {/*Опыт*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                     label="Опыт работы"
                                     id="worker_name"
                                     variant="filled"

                    />
                </div>

                <Link to={'/'}><MyButton>Назад</MyButton></Link>
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


export default NewWorker4;