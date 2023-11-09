import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import WorkerList from "../../components/WorkerList/WorkerList";
import './EditWorker.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"

import btnBack from "../../image/newspec/button_back.png"
import btnSave from "../../image/newspec/button_save.png"
import formCategory from "../../image/newspec/form_category.png"
import NewSelect from '../../components/UI/NewSelect/NewSelect';
import NewSelect2 from '../../components/UI/NewSelect2/NewSelect2';

//import TextField from '@mui/material/TextField';
//import { alpha, styled } from '@mui/material/styles';
import specData from "../../data/specData"
import { useUsersContext } from "../../contexts/UserContext";
import { sendMyMessage } from '../../http/chatAPI';

const API_URL = process.env.REACT_APP_API_URL

const EditWorker = () => {
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
            <Header header={{title: 'Новая специальность', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            {/* <div className='form-new1'>
                <div>
                    <label>
                        <p
                            style={{
                                margin: '20px 5px',
                                display: 'flex',
                                fontSize: '14px',
                                color: '#2975f5',
                            }}>Выберите свою специальность
                        </p>

                        <div className="text-field text-field_floating">
                            <CustomSelect
                                id="category"
                                title="Категория"
                                options={categories}
                                selectedElement={selectedElement}
                                setSelectedElement={setSelectedElement}
                                onChange={onCategoriesSelectChange}
                            />
                        </div>

                        <div className="text-field text-field_floating">
                            <CustomSelect
                                disabled={disabled}
                                id="model"
                                title="Специальность"
                                options={models}
                                selectedElement={selectedElement}
                                setSelectedElement={setSelectedElement}
                                onChange={onSpecSelectChange}
                            />
                        </div>
                    </label>


                    <p>
                        <MyButton
                            disabled={disabledBtn}
                            style={{marginBottom: "15px", width: "150px"}}
                            onClick={addNewWorker}
                        >Добавить
                        </MyButton>
                    </p>

                </div>

                <WorkerList remove={removeWorker} workers={workers} />           

                <Link to={'/edit-worker2'}><MyButton style={{marginBottom: "15px", width: "220px", visibility: showNext ? "visible" : "hidden"}}>Сохранить</MyButton></Link>     
            </div> */}


            {/*Специализация*/}
            {/* <label style={{position: 'absolute', top: '190px', left: '80px'}}>
                <p style={{fontSize: '18px', color: '#fff'}}>
                    Выберите свою специальность
                </p>
            </label> */}

            <div style={{display: 'flex', height: '100vh'}}>

                <div className='form-edit-worker1'>       
                    <p style={{marginTop: '-35px', fontSize: '17px', color: '#fff'}}>
                        Выберите свою специальность
                    </p> 

                    <p style={{position: 'absolute', top: '70px', left: '50px', fontSize: '14px'}}>Категория</p>    
                    <div style={{position: 'relative', marginTop: '35px'}}>
                       <NewSelect
                            id="category"
                            options={categories}
                            selectedElement={selectedElement}
                            setSelectedElement={setSelectedElement}
                            onChange={onCategoriesSelectChange}
                        /> 
                    </div> 

                </div>
            </div>

            <div className='footer-block' style={{bottom: '0'}}>
                <Link to={'/profile'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>
        </div>
    );
};


export default EditWorker;