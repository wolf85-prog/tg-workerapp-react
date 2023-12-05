import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewWorker3.css';
import Calendar from "../../image/calendar.svg";

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";
import FonGradWhite from "../../image/layers/grad_white.png";

import btnBackNext from "../../image/newspec/button_back.png"
import smallMenu from "../../image/layers/logo_04_light.png"

import CustomSelect3 from "../../components/UI/CustomSelect3/CustomSelect3";
import NewSelect3 from '../../components/UI/NewSelect3/NewSelect3';

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";

import { useUsersContext } from "./../../contexts/UserContext";
import NewSelect2 from '../../components/UI/NewSelectOld/NewSelect2';
import NewSelect from '../../components/UI/NewSelect/NewSelect';

const API_URL = process.env.REACT_APP_API_URL

const NewWorker3 = () => {
    //const {city, setCity, dateborn, setDateborn} = useUsersContext();
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    const {tg, queryId, user} = useTelegram();

    const navigate = useNavigate();
    const handleClick = () => navigate(-1);

    const { workerFam, workerName, phone, workers, 
        city, setCity, dateborn, setDateborn } = useUsersContext();

    console.log(workerFam, workerName, phone, workers, city, dateborn)

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
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх 
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
            text: 'Сохранить',
            color: '#000000' //'#2e2e2e'
        })
    }, [])

    useEffect(() => {
        if (city, dateborn) {
           tg.MainButton.show(); 
        } else {
            tg.MainButton.hide();  
        }
        
    }, [])


    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeTime = (e) => {
        setDateborn(e.target.value)
    }

    useEffect(() => {
        tg.onEvent("backButtonClicked", handleClick)
        return () => {
            tg.offEvent('backButtonClicked', handleClick)
        }
    }, [handleClick])

    useEffect(() => {
        tg.BackButton.show();
    }, [])


    return (
        <div className="App">
            <Header header={{title: 'Новый специалист', icon: 'false'}}/>

             {/* темный фон */}
             <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            {/* белый градиент */}
            <div  style={{display: 'flex', height: '100vh', position: 'absolute', zIndex: '2', width: '100%'}}>
                <img src={FonGradWhite} alt='' className='fon-style-white'/>
            </div>

            <div style={{display: 'flex', height: '100vh', padding: '0px 25px'}}>

                <div className='form-new-worker3'>               
                    {/*Город*/}
                    <div style={{position: 'relative', marginTop: '33px', marginLeft: '30px', marginRight: '30px'}}>
                        <input
                            className='input-style-city'
                            placeholder='Ваш город'
                            id="worker_name"
                            onChange={onChangeCity}
                            value={city}
                        /> 
                    </div>
                        
                    {/*Год рождения*/}
                    <p style={{position: 'absolute', top: '80px', left: '30px', fontSize: '14px'}}>Год рождения</p>   
                    <div style={{position: 'relative', marginTop: '14px', marginLeft: '30px', marginRight: '30px'}}>
                        <NewSelect3
                            id="dateborn"
                            options={dates}
                            selectedElement={selectedElement}
                            setSelectedElement={setSelectedElement}
                            onChange={onDatesSelectChange}
                        />
                    </div>
                         

                    <div className='block-buttons-worknew3'>
                        <Link to={'/add-worker2'}><button className="image-button-next3" style={{backgroundImage: `url(${btnBackNext})`}}>Назад</button></Link>
                    </div>                 
                </div>   
            </div>            

            <div style={{position: 'fixed', bottom: '25px', right: '0'}}>
                <img src={smallMenu} alt='' className='small-menu-icon' />
            </div>
            
        </div>
    );
};


export default NewWorker3;