import React, { useState, useEffect, useCallback, useRef } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import MyModal from "../../components/MyModal/MyModal";
import Header from "../../components/Header/Header";
import DropdownClient from '../../components/DropdownClient/DropdownClient';
import Calendar from '../../components/Calendar/Calendar'
import comtegs from './../../data/comtegs';
import { getCompanyProfId } from './../../http/companyAPI'
import { getProjects } from './../../http/projectAPI'
import { getWorkers } from './../../http/workerAPI'
import Autocomplete from '@mui/material/Autocomplete';

import './CalendarPage.css';

import BlackFon from "../../image/new/fon_grad.svg";

const API_URL = process.env.REACT_APP_API_URL

const CalendarPage = () => {
    const { id } = useParams();
    const {tg, queryId, user, onClose} = useTelegram();
    const navigate = useNavigate();

    const [widthD, setWidthD] = useState(0)

    const [showModal, setShowModal] = useState(true)
    const [headerName, setHeaderName] = useState('Мой профиль');
    const [comteg, setComteg] = useState(["Все"]);
    const [nameCompany, setNameCompany] = useState('');
    const [fioSpec, setFioSpec] = useState('');
    const [projects, setProjects] = useState([]);
    const [height, setHeight] = useState(200)
    const [worker, setWorker] = useState('');
    const [workers, setWorkers] = useState([]);
    const [sortedWorkers, setSortedWorkers] = useState([])

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
        console.log("Загрузка данных...", id)

        const fetch = async()=> {
            const res = await getCompanyProfId(id)
            console.log("res: ", res)
            setNameCompany(res?.title)

            const res2 = await getProjects(id)
            console.log("res2: ", res)        
            setProjects(res2)

            const res3 = await getWorkers(67)
            console.log("res3: ", res3)

            const newWorkers = res3.map((item)=> { 
                const newArr = item.fio
                return newArr
            })

            const sorted = newWorkers.sort((a, b) => {       
                var cityA = a, cityB = b
                return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
            })
                    
            setSortedWorkers(sorted)
            setWorker(res3[0]?.fio)
        }
        fetch()
        
    }, [])

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
                        }}>{nameCompany ? nameCompany : 'Название'}
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
                            }}>{projects.length}
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
                    {/* <div className="text-field__input" type="text" name="dateReg" id="dateReg" 
                        style={{
                            backgroundColor: 'transparent', 
                            color: '#fff',
                            border: '1px solid #4f4f55'
                        }}>{fioSpec ? fioSpec : 'Иванов Иван Иванович'}
                    </div> */}
                    <Autocomplete
                        sx={{
                            display: 'inline-block',
                            '& input': {zIndex: '25',
                                width: '100%',
                                border: 'none',
                                height: '40px',
                                padding: '5px 4px',
                                fontFamily: 'inherit',
                                fontSize: '14px',
                                fontWeight: '700',
                                lineHeight: '1.5',
                                textAlign: 'center',
                                color: '#ffffff',
                                backgroundColor: 'transparent', 
                            }
                        }}
                        className="text-field__input" 
                        openOnFocus
                        id="custom-input-demo"
                        options={sortedWorkers}
                        noOptionsText={'Пусто'}
                        style={{
                            width: '100%', 
                            padding: '0',
                            color: '#ebeff3',
                            backgroundColor: 'transparent',
                            border: '1px solid #4f4f55',
                        }}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        onInputChange={(e)=>setWorker(e.target.value)}
                        onChange={(event, newValue) => {
                        if (newValue && newValue.length) {                                                      
                            setWorker(newValue)
                        }  
                        }}
                        value={worker} 
                        inputValue={worker}
                        renderInput={(params) => (
                        <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                            <input 
                                className="text-field__input" 
                                type="text" {...params.inputProps} 
                                placeholder=''
                                style={{backgroundColor: 'transparent!important'}}
                            />
                        </div>
                        )}
                    />
                    
                </div>

                <p className="label-calendar">Комтег</p>
                <div className="text-field"> 
                    <DropdownClient
                        style={{backgroundColor: '#282b2e', position: 'absolute', left: '50%', width: '100%'}}
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

                <div style={{width: '100%', padding: '7px', height: '40px', border: '1px solid green', borderRadius: '10px', marginTop: '285px'}}>
                    <span style={{fontSize: '16px', color: 'green'}}>
                        Применить
                    </span>
                </div>
            </div>

            

        </div>
    );
};


export default CalendarPage;