import React, { useState, useEffect, useCallback, useRef } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import MyModal from "../../components/MyModal/MyModal";
import Header from "../../components/Header/Header";
import DropdownClient from '../../components/DropdownClient/DropdownClient';
import Calendar from '../../components/Calendar/Calendar'
import comtegs from './../../data/comtegs';
import { getCompanyProfId } from './../../http/companyAPI'
import { getProjects, getProjectsMainSpec, getManagerId } from './../../http/projectAPI'
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

    const [showProject, setShowProject] = useState(false)
    const [headerName, setHeaderName] = useState('Мой профиль');
    const [comteg, setComteg] = useState(["Все"]);
    const [period, setPeriod] = useState(["07.2025"]);
    const [nameCompany, setNameCompany] = useState('');
    const [fioSpec, setFioSpec] = useState('');
    const [projects, setProjects] = useState([]);
    const [projectsSort, setProjectsSort] = useState([]);
    const [height, setHeight] = useState(200)
    const [worker, setWorker] = useState('');
    const [workers, setWorkers] = useState([]);
    const [sortedWorkers, setSortedWorkers] = useState([])
    const [projectName, setProjectName] = useState('');
    const [projectDate, setProjectDate] = useState('01.01.2025');
    const [projectTime, setProjectTime] = useState('00:00');
    const [projectManager, setProjectManager] = useState('Старший');
    const [project, setProject] = useState([])
    const [projectCount, setProjectCount] = useState(0)

    const filterData = [
        {
            label: 'Все',
            name: 'Все',
            value: '1',
            color: '#1E90FF'
        },
    ]

    const periodData = [
        {
            label: '06.2025',
            name: '06.2025',
            value: '6',
            color: '#1E90FF'
        },
        {
            label: '07.2025',
            name: '07.2025',
            value: '7',
            color: '#1E90FF'
        },
        {
            label: '08.2025',
            name: '08.2025',
            value: '8',
            color: '#1E90FF'
        },
        {
            label: '09.2025',
            name: '09.2025',
            value: '9',
            color: '#1E90FF'
        },
        {
            label: '10.2025',
            name: '10.2025',
            value: '10',
            color: '#1E90FF'
        },
        {
            label: '11.2025',
            name: '11.2025',
            value: '11',
            color: '#1E90FF'
        },
        {
            label: '12.2025',
            name: '12.2025',
            value: '12',
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

            const resProjects = await getProjects(id)
            console.log("resProjects: ", resProjects)  

            const filterProject = resProjects.filter((item)=> item.dateStart.split('-')[1] === '07') 
            console.log("filterProject: ", filterProject, filterProject[0].dateStart.split('T')[0] )  

            setProjects(filterProject)
            setProjectsSort(filterProject)

            const res3 = await getWorkers(67)
            console.log("workers id 67: ", res3)
            setWorkers(res3)

            const newWorkers = res3.map((item)=> { 
                const newArr = item.fio
                return newArr
            })

            const sorted = newWorkers.sort((a, b) => {       
                var cityA = a, cityB = b
                return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
            })
                    
            setSortedWorkers(sorted)
            setWorker(sorted[0])

        }
        fetch()
        
    }, [])

    useEffect(() => {
        console.log("worker: ", worker)

        const resWorker = workers.find(item=> item.fio === worker)
        console.log(resWorker)

        const fetch = async()=> {
            let arrTempProjects = []
            const maninSpecId = await getProjectsMainSpec(67, resWorker?.id)
            console.log("maninSpecId: ", maninSpecId)

            projects.map(proj=> {
                maninSpecId.map((item)=> {
                    if (proj.id.toString() === item.projectId)
                        arrTempProjects.push(proj)
                })
            })  

            console.log("arrTempProjects: ", arrTempProjects)
            setProjectsSort(arrTempProjects)
            setProjectCount(arrTempProjects.length)
        }

        fetch()

        
    }, [worker, projects])

    useEffect(() => {
        tg.onEvent("backButtonClicked", onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, [onClose])

    useEffect(() => {
        tg.BackButton.show();
    }, [])


    const openProject = async(index) => {
        console.log("project: ", index)
        setShowProject(true)

        const filterProject = projects.find((item)=> item.id === index.id) 
        console.log("filterProject: ", filterProject)  
        setProjectName(filterProject?.name)

        const data = filterProject?.dateStart
        setProjectDate(`${data.split('T')[0].split('-')[2]}.${data.split('T')[0].split('-')[1]}.${data.split('T')[0].split('-')[0]}`)
        setProjectTime(`${data.split('T')[1].split(':')[0]}:${data.split('T')[1].split(':')[1]}`)

        const resManager = await getManagerId(filterProject.managerId)
        console.log("resManager: ", resManager)
        setProjectManager(resManager?.fio)
    }
    
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
                            }}>{projectCount}
                        </div>
                    </div>
                    <div style={{width: '47%'}}>
                        <p className="label-calendar">Период</p>
                        <div className="text-field">
                            {/* <div className="text-field__input" type="text" name="dateReg" id="dateReg" 
                                style={{
                                    backgroundColor: 'transparent', 
                                    color: '#fff',
                                    border: '1px solid #4f4f55'
                                }}>06.2025
                            </div> */}
                            <DropdownClient
                                style={{backgroundColor: '#282b2e', position: 'absolute', left: '50%', width: '100%'}}
                                options={periodData}
                                tags={period}
                                setTags={setPeriod}
                            />
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
                    openProject={openProject} 
                    // showSidebar={showSidebar} 
                    // setShowSidebar={setShowSidebar} 
                    //setShowProject={setShowProject} 
                    // setShowCalendar={setShowCalendar} 
                    // setShowCalendar2={setShowCalendar2} 
                    projects={projectsSort}
                    setHeight={setHeight}
                />

                <div style={{width: '100%', padding: '7px', height: '40px', border: '1px solid green', borderRadius: '10px', marginTop: '285px'}}>
                    <span style={{fontSize: '16px', color: 'green'}}>
                        Применить
                    </span>
                </div>
            </div>

            <MyModal visible={showProject} setVisible={setShowProject}>
                            <div className='info-card'>
                                <div className='rectangle-modal'></div>
                                <div className='rectangle-modal2'></div>
                                <div className='rectangle-modal3'></div>
            
                                <p className='vagno'>{projectName}</p>
                                <p className='vagno' style={{marginTop: '25px'}}>{projectDate} {projectTime}</p>

                                <p className='vagno' style={{marginTop: '60px'}}>{projectManager}</p>

                                <div className='text-vagno' style={{textAlign: 'left'}}>

                                </div>
                                <div className='button-ok' onClick={()=>setShowProject(false)}>
                                    <div className='rec-button'>ОК</div>     
                                </div>
                            </div>
            </MyModal>

        </div>
    );
};


export default CalendarPage;