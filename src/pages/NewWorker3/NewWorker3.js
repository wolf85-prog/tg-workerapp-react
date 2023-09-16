import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewWorker3.css';
import Calendar from "../../image/calendar.svg";
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
import CustomSelect3 from "../../components/UI/CustomSelect3/CustomSelect3";

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";

import { useUsersContext } from "./../../contexts/UserContext";

const API_URL = process.env.REACT_APP_API_URL

const NewWorker3 = () => {
    //const {city, setCity, dateborn, setDateborn} = useUsersContext();

    const {tg, queryId, user} = useTelegram();

    const { workerFam, workerName, phone, workers, 
        city, setCity, dateborn, setDateborn } = useUsersContext();

    //console.log(workerFam, workerName, phone, workers, city, dateborn)

    const [isLoading, setIsLoading] = useState(false);
    const [selectedElement, setSelectedElement] = useState("")

    //даты
    const [dates, setDates] = useState([]);
    let datesArr = []

    useEffect(() => {
        for (let i = 1945; i < 2023; i++) { // выведет 0, затем 1, затем 2         
            const obj = {
                id: i,
                name: i,
            }
            datesArr.push(obj)
        }   
        setDates(datesArr)
    }, [])

    useEffect(() => {
        setSelectedElement(55);
    }, [])

    const onDatesSelectChange = (e) => {
        setSelectedElement(e.target.options.value);
        setDateborn(e.target.value)
    }

    //отправка данных в telegram-бот
    const onSendData = useCallback(() => {
        const data = {
            workerfamily: workerFam,
            workerName, 
            phone,
            worklist: workers,
            city, 
            dateborn, 
            queryId,
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
              
    }, [workerFam, workerName, phone, workers, city, dateborn])

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

    useEffect(() => {
        tg.MainButton.show();
    }, [])


    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeTime = (e) => {
        setDateborn(e.target.value)
    }


    return (
        <div className="App">
            <Header header={{title: 'Новый специалист', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>

            <form>
                {/*Город*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                    label="Ваш город"
                                    id="worker_name"
                                    variant="filled"
                                    onChange={onChangeCity}
                                    value={city}
                    />
                </div>

                {/*Сколько лет*/}
                {/*Дата начала*/}
                {/* <div className="text-field text-field_floating">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} style={{backgroundColor: '#2A2731', borderRadius: '10px'}}>
                            <RedditTextField
                                id="date"
                                label="Год рождения"
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
                </div> */}

                {/* <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                        label="Год рождения"
                        id="date"
                        variant="filled"
                        onChange={onChangeTime}
                        value={dateborn}
                    />
                </div> */}

                {/* <div className="text-field text-field_floating"> */}
                    <CustomSelect3
                        id="dateborn"
                        title="Год рождения"
                        options={dates}
                        selectedElement={selectedElement}
                        setSelectedElement={setSelectedElement}
                        onChange={onDatesSelectChange}
                     />
                {/* </div> */}

                <div className='block-buttons'>
                    <Link to={'/add-worker2'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton></Link>
                    {/* <Link to={'/add-worker4'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Далее</MyButton></Link>  */}
                </div>
            </form>
            
        </div>
    );
};

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props}  />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        height: '55px',
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


export default NewWorker3;