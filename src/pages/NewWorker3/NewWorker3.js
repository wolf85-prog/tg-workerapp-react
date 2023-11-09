import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewWorker3.css';
import Calendar from "../../image/calendar.svg";

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import btnBackNext from "../../image/newspec/button_back.png"
import smallMenu from "../../image/layers/ULEY text.png"

import CustomSelect3 from "../../components/UI/CustomSelect3/CustomSelect3";

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";

import { useUsersContext } from "./../../contexts/UserContext";
import NewSelect2 from '../../components/UI/NewSelect2/NewSelect2';
import NewSelect from '../../components/UI/NewSelect/NewSelect';

const API_URL = process.env.REACT_APP_API_URL

const NewWorker3 = () => {
    //const {city, setCity, dateborn, setDateborn} = useUsersContext();
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

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
        //setSelectedElement(2000);
        console.log(workerFam, workerName, phone, workers, city, dateborn)
    }, [workerFam, workerName, phone, workers, city, dateborn])

    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    })

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

             {/* темный фон */}
             <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

                <div style={{display: 'flex', height: '100vh'}}>

                    <div className='form-new-worker3'>               
                        {/*Город*/}
                        <div style={{position: 'absolute', top: '100px', left: '54px'}}>
                            <input
                                className='input-style-city'
                                placeholder='Ваш город'
                                id="worker_name"
                                onChange={onChangeCity}
                                value={city}
                            /> 
                        </div>
                        
                        {/*Год рождения*/}
                        <p style={{position: 'absolute', top: '135px', left: '54px', fontSize: '14px'}}>Год рождения</p>  
                        <div style={{position: 'absolute', top: '160px', left: '54px'}}>
                            <NewSelect2
                                id="dateborn"
                                options={dates}
                                selectedElement={selectedElement}
                                setSelectedElement={setSelectedElement}
                                onChange={onDatesSelectChange}
                            />
                        </div>
                         

                        <div className='block-buttons-worknew3'>
                            <Link to={'/add-worker2'}><button class="image-button-next3" style={{backgroundImage: `url(${btnBackNext})`}}>Назад</button></Link>
                        </div>                 
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


export default NewWorker3;