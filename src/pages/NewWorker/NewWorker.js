import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";

import WorkerList from "../../components/WorkerList/WorkerList";
import './NewWorker.css';

import BlackFon from "../../image/new/fon_grad.svg";
// import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";
import FonGradWhite from "../../image/layers/grad_white.png";

import btnSave from "../../image/buttons/btn_add.png"

import NewSelect from '../../components/UI/NewSelect/NewSelect';
import NewSelect2 from '../../components/UI/NewSelect2/NewSelect2';
import NewSelect3 from '../../components/UI/NewSelect3/NewSelect3';

import specData from "../../data/specData"
import { useUsersContext } from "./../../contexts/UserContext";
import { sendMyMessage } from '../../http/chatAPI';


const API_URL = process.env.REACT_APP_API_URL

const NewWorker = () => {
    const {tg, user} = useTelegram();
    const navigate = useNavigate();
    const handleClick = () => navigate(-1);

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

    //---------------------------------------------------------------------------------------

    // 1. при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {
        //setSelectedElement(e.target.value);
        //console.log(e.target.value)

        // преобразуем выбранное значение опции списка в число - идентификатор категории
        const categoryId = parseInt(e.target.value) //parseInt(e.target.options[e.target.selectedIndex].value);
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
        //setTitleSpec("Выберите специальность...")
    }

    // 2. выбор специальности
    const onSpecSelectChange = (e) => {
        //console.log(e.target.value)
        //setSelectedElement(e.target.value);

        const modelId = e.target.value //parseInt(e.target.options[e.target.selectedIndex].value);
        //console.log("modelId: ", modelId)
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

    const onClose = () => {
        tg.close()
    }

    useEffect(() => {
        tg.onEvent("backButtonClicked", onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, [onClose])

    useEffect(() => {
        tg.BackButton.show();
    }, [])

    //-----------------------------------------------------------------------------

    return (
        <div className="App">

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />

            {/*Специализация*/}   
            <p style={{position: 'absolute', top: '25px', left: '25px', fontSize: '17px', color: '#fff'}}>
                Выберите свою специальность
            </p>

                       
            <div style={{position: 'relative', marginTop: '80px', marginLeft: '25px', marginRight: '25px'}}>
            <p className='cat-title'>Категория...</p>  
                <NewSelect
                    id="category"
                    options={categories}
                    titleCat={titleCat}
                    setTitleCat={setTitleCat}
                    onChange={onCategoriesSelectChange}
                /> 
            </div>
                          
            <div style={{position: 'relative', marginTop: '20px', marginLeft: '25px', marginRight: '25px'}}>
            <p className='cat-title'>Специальность...</p> 
                <NewSelect2
                    disabled={disabled}
                    id="model"
                    options={models}
                    titleSpec={titleSpec}
                    setTitleSpec={setTitleSpec}
                    onChange={onSpecSelectChange}
                />
            </div>

            <div style={{position: 'relative', marginTop: '10px', marginRight: '25px'}}>
                <button 
                    disabled={disabledBtn}
                    className="image-button-add" 
                    style={{ backgroundImage: `url(${btnSave})`}}
                    onClick={addNewWorker}
                >
                    Добавить
                </button> 
            </div>
            
   

            {/*список работников*/}
            {/* <div style={{
                boxSizing: 'border-box', 
                height: '140px', 
                zIndex: 20,
                paddingTop: '40px',
            }}>
                <WorkerList remove={removeWorker} workers={workers} />
            </div>            */}
            

            {/* Далее */}
            {/* <div style={{
                            position: 'absolute', 
                            bottom: '0px', 
                            //left: '15%',
                            zIndex: '20',
                            width: '100%',
                        }}>
                        <Link to={'/add-worker2'}>
                            <button 
                                className="image-button-edit" 
                                style={{ backgroundImage: `url(${btnSave})`, marginBottom: "15px", visibility: showNext ? "visible" : "hidden"}}>
                                    Далее
                            </button>
                        </Link>
            </div> */}


        </div>
    );
};


export default NewWorker;