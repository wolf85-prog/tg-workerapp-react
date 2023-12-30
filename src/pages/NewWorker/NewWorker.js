import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import MyModal from "../../components/MyModal/MyModal";

import WorkerList from "../../components/WorkerList/WorkerList";
import './NewWorker.css';

import BlackFon from "../../image/new/fon_grad.svg";

import btnSave from "../../image/buttons/btn_add.png"

import NewSelect from '../../components/UI/NewSelect/NewSelect';
import NewSelect2 from '../../components/UI/NewSelect2/NewSelect2';
import NewSelect3 from '../../components/UI/NewSelect3/NewSelect3';

import specData from "../../data/specData"
import { useUsersContext } from "./../../contexts/UserContext";
import { sendMyMessage } from '../../http/chatAPI';

import InputMask from 'react-input-mask';

const API_URL = process.env.REACT_APP_API_URL

const NewWorker = () => {
    const {tg, queryId, user} = useTelegram();
    const navigate = useNavigate();
    const handleClick = () => navigate(-1);

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    const {worker, setWorker, workers, setWorkers} = useUsersContext();
    const { workerFam, setWorkerFam, workerName, setWorkerName, phone, setPhone } = useUsersContext();
    const {city, setCity, dateborn, setDateborn} = useUsersContext();

    //даты
    const [dates, setDates] = useState([]);
    let datesArr = []

    //категории
    const [categories, setCategories] = useState([]);
    //специальности
    const [models, setModels] = useState([]);

    const [showSpec, setShowSpec] = useState(false)
    const [showNext, setShowNext] = useState(false)
    
    const [showBlockFam, setShowBlockFam] = useState(false)
    const [showBlockCity, setShowBlockCity] = useState(false)

    const [showFIO, setShowFIO] = useState(false)
    const [showDate, setShowDate] = useState(false)
    const [showApply, setShowApply] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showMainBtn, setShowMainBtn] = useState(false)

    //select
    const [selectedElement, setSelectedElement] = useState("")
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [disabledBtn2, setDisabledBtn2] = useState(true)
    const [disabled, setDisabled] = useState(true)
    const [titleCat, setTitleCat] = useState(false)
    const [titleSpec, setTitleSpec] = useState(false)
    const [titleDate, setTitleDate] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

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
        for (let i = 1945; i < 2023; i++) { // выведет 0, затем 1, затем 2         
            const obj = {
                id: i,
                name: i,
            }
            datesArr.push(obj)
        }   
        setDates(datesArr)
    }, [])

    //---------------------------------------------------------------------------------------

    // 1. при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {
        //setSelectedElement(e.target.value);

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

        setShowBlockFam(true)
    }

    {/* Удаление специальности */}
    const removeWorker = (worker) => {
        setWorkers(workers.filter(p => p.id !== worker.id))
    }

    const addNewWorker2 = (e) => {
        setShowFIO(true)
        setShowBlockCity(true)
    }

    const editNewWorker2 = (e) => {
        setShowFIO(false)
    }

    const addNewWorker3 = () => {
        setShowDate(true)
        setShowApply(true)
    }


    const onChangeFamily = (e) => {
        setWorkerFam(e.target.value)
    }

    const onChangeName = (e) => {
        setWorkerName(e.target.value)
    }

    const handlePhone = (e)=>{
        setPhone(e.target.value)
        //console.log(phone.length)

        setDisabledBtn(false)
    }

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeTime = (e) => {
        setDateborn(e.target.value)
    }

    const onDatesSelectChange = (e) => {
        //setSelectedElement(e.target.value);
        setDateborn(e.target.value)
        setDisabledBtn2(false)
    }


    const clickApply = () => {
        console.log("apply")
        setShowModal(true)
        setShowMainBtn(true)
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
        if (showMainBtn) {
           tg.MainButton.show(); 
        } else {
            tg.MainButton.hide();  
        }
        
    }, [showMainBtn])

    //-------------------------------------------------------------------

    return (
        <div className="App">

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />

            {/*Специализация*/}   
            <p style={{position: 'absolute', top: '25px', left: '25px', fontSize: '17px', color: '#fff'}}>
                Выберите свою специальность
            </p>

                       
            <div style={{position: 'relative', marginTop: '80px', marginLeft: '25px', marginRight: '25px'}}>
            <p className='cat-title' style={{display: titleCat ? 'none' : 'block'}}>Категория...</p>  
                <NewSelect
                    id="category"
                    options={categories}
                    titleCat={titleCat}
                    setTitleCat={setTitleCat}
                    onChange={onCategoriesSelectChange}
                /> 
            </div>
                          
            <div style={{position: 'relative', marginTop: '20px', marginLeft: '25px', marginRight: '25px'}}>
            <p className='cat-title' style={{display: titleSpec ? 'none' : 'block'}}>Специальность...</p> 
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
            <div style={{
                boxSizing: 'border-box', 
                height: 'auto', 
                zIndex: 20,
                paddingTop: '40px',
            }}>
                <WorkerList remove={removeWorker} workers={workers} />
            </div>           
            
            <div style={{display: showBlockFam ? 'block' : 'none'}}>
                {/* Фамилия */}
                <div style={{position: 'relative', marginTop: '20px', marginLeft: '30px', marginRight: '30px', height: '43px'}}>
                    <div className='rec1-input'></div>
                    <div className='rec2-input'></div>
                    <div className='rec3-input'></div>
                    <input
                        className='input-style3'
                        placeholder='Фамилия'
                        id="worker_soname"
                        variant="filled"
                        onChange={onChangeFamily}
                        value={workerFam}
                    />
                </div>

                {/* Имя */}
                <div style={{position: 'relative', marginTop: '20px', marginLeft: '30px', marginRight: '30px', height: '43px'}}>
                    <div className='rec1-input'></div>
                    <div className='rec2-input'></div>
                    <div className='rec3-input'></div>
                    <input
                        className='input-style3'
                        placeholder='Имя'
                        id="worker_name"
                        onChange={onChangeName}
                        value={workerName}
                    /> 
                </div>         

                {/* Номер телефона */}
                <div style={{position: 'relative', marginTop: '20px', marginLeft: '30px', marginRight: '30px', height: '43px'}}>
                    <div className='rec1-input'></div>
                    <div className='rec2-input'></div>
                    <div className='rec3-input'></div>
                    <InputMask
                        className='input-style3'
                        mask="+7 (999) 999-99-99"
                        disabled={false}
                        maskChar=""
                        onChange={handlePhone} 
                        value={phone}
                        placeholder='Номер телефона'
                    >
                    </InputMask>
                </div>

                <div style={{position: 'relative', marginTop: '10px', marginRight: '25px'}}>
                    <p className='fio-text' style={{display: showFIO ? 'block' : 'none'}}>{workerFam} {workerName} | {phone}</p>

                    {!showFIO ? 
                    <button 
                        disabled={disabledBtn}
                        className="image-button-add" 
                        style={{ backgroundImage: `url(${btnSave})`}}
                        onClick={addNewWorker2}
                    >
                        Добавить
                    </button> 
                    :<button 
                        disabled={disabledBtn}
                        className="image-button-add" 
                        style={{ backgroundImage: `url(${btnSave})`}}
                        onClick={editNewWorker2}
                    >
                        Изменить
                    </button> }
                </div>
            </div>


            <div style={{display: showBlockCity ? 'block' : 'none'}}>
                    {/*Город*/}
                <div style={{position: 'relative', marginTop: '70px', marginLeft: '30px', marginRight: '30px', height: '43px'}}>
                    <div className='rec1-input'></div>
                    <div className='rec2-input'></div>
                    <div className='rec3-input'></div>
                    <input
                        className='input-style3'
                        placeholder='Город'
                        id="worker_name"
                        onChange={onChangeCity}
                        value={city}
                    /> 
                </div>
                            
                {/*Год рождения*/}
                <div style={{position: 'relative', marginTop: '20px', marginLeft: '25px', marginRight: '25px'}}>
                <p className='cat-title' style={{display: titleDate ? 'none' : 'block'}}>Год рождения</p>   
                    <NewSelect3
                        id="dateborn"
                        options={dates}
                        //selectedElement={selectedElement}
                        //setSelectedElement={setSelectedElement}
                        titleDate={titleDate}
                        setTitleDate={setTitleDate}
                        onChange={onDatesSelectChange}
                    />
                </div>

                <div style={{position: 'relative', marginTop: '10px', marginRight: '25px'}}>
                    <p className='fio-text' style={{display: showDate ? 'block' : 'none'}}>{city} | {dateborn}</p>

                    {!showApply ? 
                    <button 
                        disabled={disabledBtn2}
                        className="image-button-add" 
                        style={{ backgroundImage: `url(${btnSave})`}}
                        onClick={addNewWorker3}
                    >
                        Добавить
                    </button> 
                    :<button 
                        disabled={disabledBtn2}
                        className="image-button-add" 
                        style={{ backgroundImage: `url(${btnSave})`}}
                        onClick={clickApply}
                    >
                        Подтвердить
                    </button> }
                </div>
            </div>


            <MyModal visible={showModal} setVisible={setShowModal}>
                <div className='info-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'>Регистрация прошла успешно</p>
                    <p className='text-vagno'>Добро пожаловать на борт</p>
                    <div className='button-ok' onClick={()=>setShowModal(false)}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
        </MyModal>

        </div>
    );
};


export default NewWorker;