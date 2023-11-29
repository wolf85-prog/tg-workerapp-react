import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";

import WorkerList from "../../components/WorkerList/WorkerList";
import './EditWorker.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import FonGradWhite from "../../image/layers/grad_white.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"

import btnSave from "../../image/newspec/button_save.png"
import NewSelect from '../../components/UI/NewSelect/NewSelect';
import NewSelect2 from '../../components/UI/NewSelect2/NewSelect2';

import Forma from "../../image/newspec/forma.png";

//import TextField from '@mui/material/TextField';
//import { alpha, styled } from '@mui/material/styles';
import specData from "../../data/specData"
import { useUsersContext } from "../../contexts/UserContext";
import { sendMyMessage } from '../../http/chatAPI';

const API_URL = process.env.REACT_APP_API_URL

const EditWorker = () => {
    const navigate = useNavigate();

    const {tg, queryId, user} = useTelegram();

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    const {worker, setWorker, workers, setWorkers} = useUsersContext();

    //категории
    const [categories, setCategories] = useState([]);
    //специальности
    const [models, setModels] = useState([]);

    const [showSpec, setShowSpec] = useState(false)
    const [showNext, setShowNext] = useState(false)

    //select
    const [selectedElement, setSelectedElement] = useState("")
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [titleCat, setTitleCat] = useState(false)
    const [titleSpec, setTitleSpec] = useState(false)

//----------------------------------------------------------------------------------
    const handleClick = () => navigate(-1);

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        //отправляем в админку сообщение
        //sendMyMessage(user?.id)

        // устанавливаем категории
        if (specData.length > 0 && specData) {
            setCategories(specData);
        }

        // и модели из первой категории по умолчанию
        if (specData.length > 0 && specData[0].models && specData[0].models.length > 0) {
            setModels(specData[0].models);
        }

    }, []);


    useEffect(() => {
        if (workers.length > 0) {
            setShowNext(true)
        } else {
            setShowNext(false)
        }
    }, [workers])

    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх 
    })

    useEffect(() => {
        tg.onEvent("backButtonClicked", handleClick)
        return () => {
            tg.offEvent('backButtonClicked', handleClick)
        }
    }, [handleClick])

    useEffect(() => {
        tg.BackButton.show();
    }, [])

    //---------------------------------------------------------------------------------------

    // 1. при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {

        // console.log(e.target.value)
        // setSelectedElement(e.target.value);

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        //const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);
        const categoryId = e.target.value //parseInt(e.target.value);
        // получаем из массива категорий объект категории по соответствующему идентификатору
        const category = categories.find(item => item.id === categoryId);
        const catSelect = category.icon; //capitalizeFirst(category.name);
        const iconCatSelect = category.icon;

        setWorker({...worker, cat: catSelect, icon: iconCatSelect})

        // выбираем все модели в категории, если таковые есть
        const models = category.models && category.models.length > 0
            ? category.models
            : [{ id: 0, name: 'Нет моделей', items: [] }];

        // меняем модели во втором списке
        setModels(models);

        setDisabled(false)
        setTitleSpec("")
    }

    // 2. выбор специальности
    const onSpecSelectChange = (e) => {
        setSelectedElement(e.target.value);

        const modelId = e.target.value //parseInt(e.target.options[e.target.selectedIndex].value);
        const model = models.find(item => item.id === modelId);

        setWorker({...worker, spec: model.name})

        setDisabledBtn(false)
    }


    {/* Добавление специальности */}
    const addNewWorker = (e) => {
        e.preventDefault();

        if (worker.cat !== '' || worker.spec !== '') {
            setWorkers([...workers, {...worker, id: Date.now()}])
        }

        setWorker({cat: '', spec: '', icon: ''})
        setSelectedElement("");

        setDisabled(true);
        setShowSpec(false)
        setDisabledBtn(true);

        setTitleCat("")
        setTitleSpec("")
    }

    {/* Удаление специальности */}
    const removeWorker = (worker) => {
        setWorkers(workers.filter(p => p.id !== worker.id))
    }


    //отправка данных в telegram-бот
    const onSendData = useCallback(() => {

        const data = {
            worklist: workers, 
            user,
            queryId,
        }

        tg.MainButton.hide();

        fetch(API_URL + 'web-addspec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
              
    }, [ workers, user ])

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
        if (workers.length > 0) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        } 
    }, [workers])


    return (
        <div className="App">
            <Header header={{title: 'Добавить специальность', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            {/* треугольники */}
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />    
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
            
            {/* белый градиент */}
            <div  style={{display: 'flex', height: '100vh', position: 'absolute', zIndex: '2'}}>
                <img src={FonGradWhite} alt='' className='fon-style-white'/>
            </div>    
            
            <div style={{paddingTop: '45px'}}>
                <div style={{display: 'flex', height: 'calc(100vh - 105px)', padding: '0 25px', overflow: 'hidden'}}>

                    {/* Чёрная плашка */}
                    <div className='form-edit-worker1'> 
                        {/*Специализация*/}      
                        <p style={{marginTop: '-35px', fontSize: '17px', color: '#fff'}}>
                            Выберите свою специальность
                        </p>

                        <p style={{position: 'absolute', top: '8px', left: '30px', fontSize: '14px'}}>Категория</p>    
                        <div style={{position: 'relative', marginTop: '44px', marginLeft: '30px', marginRight: '30px'}}>
                            <NewSelect
                                    id="category"
                                    options={categories}
                                    titleCat={titleCat}
                                    setTitleCat={setTitleCat}
                                    onChange={onCategoriesSelectChange}
                            /> 
                        </div> 

                        <p style={{position: 'absolute', top: '80px', left: '30px', fontSize: '14px'}}>Специальность</p>   
                        <div style={{position: 'relative', marginTop: '34px', marginLeft: '30px', marginRight: '30px'}}>
                            <NewSelect2
                                disabled={disabled}
                                id="model"
                                options={models}
                                titleSpec={titleSpec}
                                setTitleSpec={setTitleSpec}
                                onChange={onSpecSelectChange}
                            />
                        </div>

                        <button 
                            disabled={disabledBtn}
                            className="image-button-edit" 
                            style={{ backgroundImage: `url(${btnSave})`}}
                            onClick={addNewWorker}
                        >
                            Добавить
                        </button>

                        {/*список работников*/}
                        <div style={{
                            boxSizing: 'border-box', 
                            height: '140px', 
                            zIndex: 20,
                            paddingTop: '40px',
                            overflow: 'scroll',
                        }}>
                            <WorkerList remove={removeWorker} workers={workers} />
        
                        </div>

                        {/* Далее */}
                        {/* <div style={{
                                position: 'fixed', 
                                bottom: '13px', 
                                left: '15%',
                                zIndex: '20',
                                width: '70%',
                            }}>
                            <Link to={'/edit-worker2'}>
                                <button 
                                    className="image-button-edit" 
                                    style={{ backgroundImage: `url(${btnSave})`, marginBottom: "15px", visibility: showNext ? "visible" : "hidden"}}>
                                        Сохранить
                                </button>
                            </Link>
                        </div> */}
                    
                    </div>
                    
                </div>

            </div>
            
            <div className='footer-block' style={{bottom: '0'}}>
                {/* <Link to={'/profile'}><img src={btnMenu} alt='' /></Link> */}
                <div></div>
                <img src={smallMenu} alt='' className='small-menu-icon' />
            </div>
        </div>
    );
};


export default EditWorker;