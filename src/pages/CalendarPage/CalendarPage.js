import React, { useState, useEffect, useCallback, useRef } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import MyModal from "../../components/MyModal/MyModal";
import Header from "../../components/Header/Header";
import DropdownClient from '../../components/DropdownClient/DropdownClient';
import Calendar from '../../components/Calendar/Calendar'
import comtegs from './../../data/comtegs';

import './CalendarPage.css';

import BlackFon from "../../image/new/fon_grad.svg";

const API_URL = process.env.REACT_APP_API_URL

const CalendarPage = () => {
    const {tg, queryId, user, onClose} = useTelegram();
    const navigate = useNavigate();

    const [widthD, setWidthD] = useState(0)

    const [showModal, setShowModal] = useState(true)
    const [headerName, setHeaderName] = useState('Мой профиль');
    const [comteg, setComteg] = useState(["Все"]);

    const [height, setHeight] = useState(200)

    const filterData = [
        {
            label: 'Все',
            name: 'Все',
            value: '1',
            color: '#1E90FF'
        },
    ]

//----------------------------------------------------------------------------------

    useEffect(() => {
        tg.onEvent("backButtonClicked", onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, [onClose])

    useEffect(() => {
        tg.BackButton.show();
    }, [])
    
    return (
        <div className="App">

            {/* <Header header={{title: `${headerName}`, icon: 'false'}} /> */}

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            <img src={BlackFon} alt='' className='fon-black' style={{left: `${widthD}px`, zIndex: '1'}} />

            <div style={{zIndex: '10', position: 'relative', padding: '15px', textAlign: '-webkit-center'}}>

                <p className="label-calendar">Компания</p>
                <div className="text-field">
                    <div className="text-field__input" type="text" name="dateReg" id="dateReg" 
                        style={{
                            backgroundColor: 'transparent', 
                            color: '#fff',
                            border: '1px solid #4f4f55'
                        }}>fsfsdfsdf
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{width: '47%'}}>
                        <p className="label-calendar">Проекты</p>
                        <div className="text-field__input" type="text" name="dateReg" id="dateReg" 
                            style={{
                                backgroundColor: 'transparent', 
                                color: '#fff',
                                border: '1px solid #4f4f55'
                            }}>22
                        </div>
                    </div>
                    <div style={{width: '47%'}}>
                        <p className="label-calendar">Период</p>
                        <div className="text-field">
                            <div className="text-field__input" type="text" name="dateReg" id="dateReg" 
                                style={{
                                    backgroundColor: 'transparent', 
                                    color: '#fff',
                                    border: '1px solid #4f4f55'
                                }}>02.2025
                            </div>
                        </div>
                    </div>                      
                </div>

                <p className="label-calendar">ФИО</p>
                <div className="text-field">
                    <div className="text-field__input" type="text" name="dateReg" id="dateReg" 
                        style={{
                            backgroundColor: 'transparent', 
                            color: '#fff',
                            border: '1px solid #4f4f55'
                        }}>Иванов Иван Иванович
                    </div>
                </div>

                <p className="label-calendar">Комтег</p>
                <div className="text-field"> 
                    <DropdownClient
                        style={{backgroundColor: '#282b2e', left: '186px'}}
                        options={filterData}
                        tags={comteg}
                        setTags={setComteg}
                    />
                </div>

                <Calendar 
                    // openProject={openProject} 
                    // showSidebar={showSidebar} 
                    // setShowSidebar={setShowSidebar} 
                    // setShowProject={setShowProject} 
                    // setShowCalendar={setShowCalendar} 
                    // setShowCalendar2={setShowCalendar2} 
                    setHeight={setHeight}
                />

                <div style={{width: '100%', padding: '7px', height: '40px', border: '1px solid green', borderRadius: '10px', marginTop: '270px'}}>
                    <span style={{fontSize: '16px', color: 'green'}}>
                        Применить
                    </span>
                </div>
            </div>

            

        </div>
    );
};


export default CalendarPage;