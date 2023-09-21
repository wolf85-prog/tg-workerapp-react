import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import WorkerList from "../../components/WorkerList/WorkerList";
import './NewWorker.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
//import Logo from "../../image/logo_04_light.png";

//import TextField from '@mui/material/TextField';
//import { alpha, styled } from '@mui/material/styles';
import specData from "../../data/specData"
import { useUsersContext } from "./../../contexts/UserContext";
import { sendMyMessage } from '../../http/chatAPI';

const API_URL = process.env.REACT_APP_API_URL

const NewWorker = () => {
    const navigate = useNavigate();

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
        sendMyMessage(user?.id)

        // устанавливаем категории
        if (specData.length > 0 && specData) {
            setCategories(specData);
        }

        // и модели из первой категории по умолчанию
        if (specData.length > 0 && specData[0].models && specData[0].models.length > 0) {
            setModels(specData[0].models);
        }


        setTimeout(() =>  navigate("/menu"), 6000)

    }, []);


    useEffect(() => {
        if (workers.length > 0) {
            setShowNext(true)
        } else {
            setShowNext(false)
        }
    }, [workers])

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

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>

            <form>
                {/*Специализация*/}
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

                {/*список работников*/}
                <WorkerList remove={removeWorker} workers={workers} />
                

                <Link to={'/add-worker2'}><MyButton style={{marginBottom: "15px", width: "220px", visibility: showNext ? "visible" : "hidden"}}>Далее</MyButton></Link>     
            </form>
        </div>
    );
};


export default NewWorker;