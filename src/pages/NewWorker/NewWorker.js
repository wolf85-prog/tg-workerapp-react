import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";

import WorkerList from "../../components/WorkerList/WorkerList";
import './NewWorker.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import smallMenu from "../../image/layers/ULEY text.png"

import btnBack from "../../image/newspec/button_back.png"
import btnSave from "../../image/newspec/button_save.png"
import formCategory from "../../image/newspec/form_category.png"
import NewSelect from '../../components/UI/NewSelect/NewSelect';
import NewSelect2 from '../../components/UI/NewSelect2/NewSelect2';


//import TextField from '@mui/material/TextField';
//import { alpha, styled } from '@mui/material/styles';
import specData from "../../data/specData"
import { useUsersContext } from "./../../contexts/UserContext";
import { sendMyMessage } from '../../http/chatAPI';


const API_URL = process.env.REACT_APP_API_URL

const NewWorker = () => {
    const navigate = useNavigate();

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    const {worker, setWorker, workers, setWorkers} = useUsersContext();
    const {user} = useTelegram();

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

//----------------------------------------------------------------------------------

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
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    })

    //---------------------------------------------------------------------------------------

    // 1. при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {

        setSelectedElement(e.target.options.value);

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);
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
        setShowSpec(true)
    }

    // 2. выбор специальности
    const onSpecSelectChange = (e) => {
        setSelectedElement(e.target.options.value);

        const modelId = parseInt(e.target.options[e.target.selectedIndex].value);
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
    }

    {/* Удаление специальности */}
    const removeWorker = (worker) => {
        setWorkers(workers.filter(p => p.id !== worker.id))
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

            
            {/*Специализация*/}
            {/* <label style={{}}>
                <p style={{fontSize: '18px', color: '#fff'}}>
                    Выберите свою специальность
                </p>
            </label> */}

            <div style={{display: 'flex', justifyContent: 'center', height: '75vh'}}>
                <div className='form-new-worker1' style={{ backgroundImage: `url(${formCategory})`}}>   
                    <p style={{position: 'absolute', top: '70px', left: '50px', fontSize: '14px'}}>Категория</p>    
                    <div style={{position: 'absolute', top: '96px', left: '51px'}}>
                       <NewSelect
                            id="category"
                            options={categories}
                            selectedElement={selectedElement}
                            setSelectedElement={setSelectedElement}
                            onChange={onCategoriesSelectChange}
                        /> 
                    </div>
                      

                    <p style={{position: 'absolute', top: '130px', left: '50px', fontSize: '14px'}}>Специальность</p>   
                    <div style={{position: 'absolute', top: '155px', left: '51px'}}>
                        <NewSelect
                            disabled={disabled}
                            id="model"
                            options={models}
                            selectedElement={selectedElement}
                            setSelectedElement={setSelectedElement}
                            onChange={onSpecSelectChange}
                        />
                    </div>

                    <button 
                        disabled={disabledBtn}
                        class="image-button-add" 
                        style={{ backgroundImage: `url(${btnSave})`}}
                        onClick={addNewWorker}
                    >
                        Добавить
                    </button>

                </div>
                
                

                


                {/*список работников*/}
                <div style={{
                    position: 'fixed', 
                    bottom: '80px', 
                    boxSizing: 'border-box', 
                    height: '140px', 
                    overflow: 'auto',
                    zIndex: 20,
                }}>
                    <WorkerList remove={removeWorker} workers={workers} />
   
                </div>

                <div style={{
                    position: 'fixed', 
                    bottom: '10px', 
                    zIndex: 20,}}>
                    <Link to={'/add-worker2'}>
                        <button 
                            className="image-button-next" 
                            style={{ backgroundImage: `url(${btnBack})`, marginBottom: "15px", visibility: showNext ? "visible" : "hidden"}}>
                                Далее
                        </button>
                    </Link>
                </div>
                 
            </div>

            <div style={{position: 'fixed', bottom: '25px', right: '0'}}>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '25px', width: '120px'}} />
            </div>
        </div>
    );
};


export default NewWorker;