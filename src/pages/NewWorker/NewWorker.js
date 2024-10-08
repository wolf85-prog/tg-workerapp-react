import React, { useState, useEffect, useCallback, useRef } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import MyModal from "../../components/MyModal/MyModal";
import Marquee from '../../components/UI/Marquee/Marquee';

import Autocomplete from '@mui/material/Autocomplete';

import WorkerList from "../../components/WorkerList/WorkerList";
import './NewWorker.css';

import BlackFon from "../../image/new/fon_grad.svg";

import btnSave from "../../image/buttons/btn_add.png"
import iconCheck from "../../image/check.png";
import iconUnCheck from "../../image/uncheck.png";

import NewSelect from '../../components/UI/NewSelect/NewSelect';
import NewSelect2 from '../../components/UI/NewSelect2/NewSelect2';
import NewSelect3 from '../../components/UI/NewSelect3/NewSelect3';

import specData from "../../data/specData"
import cityData from '../../data/cityData';
import { useUsersContext } from "./../../contexts/UserContext";
import { sendMyMessage } from '../../http/chatAPI';
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

import InputMask from 'react-input-mask';

const API_URL = process.env.REACT_APP_API_URL

const NewWorker = () => {
    const {tg, queryId, user} = useTelegram();
    const navigate = useNavigate();

    const {worker, setWorker, workers, setWorkers, widthStr, setWidthStr, str} = useUsersContext();
    const { workerFam, setWorkerFam, workerName, setWorkerName, phone, setPhone } = useUsersContext();
    const {city, setCity, dateborn, setDateborn, friend, setFriend} = useUsersContext();

    const options = ['Option 1', 'Option 2'];

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
    const [showBlockCancel, setShowBlockCancel] = useState(false)
    const [showPulse, setShowPulse] = useState(true)
    const [showPulse2, setShowPulse2] = useState(false)

    const [showFIO, setShowFIO] = useState(false)
    const [showDate, setShowDate] = useState(false)
    const [showApply, setShowApply] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showMainBtn, setShowMainBtn] = useState(false)

    //select
    const [selectedElement, setSelectedElement] = useState("")
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [disabledBtn2, setDisabledBtn2] = useState(true)
    const [disabledFIO, setDisabledFIO] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [titleCat, setTitleCat] = useState(false)
    const [titleSpec, setTitleSpec] = useState(false)
    const [titleDate, setTitleDate] = useState(false)

    const [isLoading, setIsLoading] = useState(false);

    const [showBegun, setShowBegun] = useState(false)
    const [showBegun2, setShowBegun2] = useState(false)
    const [showBegun3, setShowBegun3] = useState(false)

    const { height, width } = useWindowDimensions();

    const [widthD, setWidthD] = useState(0)
    const [widthDX, setWidthDX] = useState(0)
    const [widthDX2, setWidthDX2] = useState(0)
    const [widthDX3, setWidthDX3] = useState(0)

    const [widthStr2, setWidthStr2] = useState(0)
    const [widthStr3, setWidthStr3] = useState(0)

    const [check, setCheck] = useState(false)
    const [check2, setCheck2] = useState(false)


    const [showInfo, setShowInfo] = useState(false)
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
        for (let i = 1970; i <= 2010; i++) { // выведет 0, затем 1, затем 2         
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


    //добавить данные ФИО и телефон
    const addNewWorker2 = (e) => {
        //console.log(phone.length)
        //if (phone.length === 18 && workerFam.length > 3 && workerName.length > 0) {
        if (workerName.length > 0) {
            setShowFIO(true)
            setShowBlockCity(true)

            let str = ''
            //str = `${workerFam} ${workerName} | ${phone}`
            str = `${workerName}`
            //console.log("str2: ", str)

            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext("2d");
            ctx.font = "14px Arial";        
            let widthX = Math.round(ctx.measureText(str).width);

            setWidthStr2(widthX)

            setDisabledFIO(true)
        }
    }

    const editNewWorker2 = (e) => {
        setShowFIO(false)
        setDisabledFIO(false)
        setShowBlockCity(false)
    }

    const addNewWorker3 = () => {
        setShowDate(true)
        setShowApply(true)

        let str = ''
        str = `${city} | ${dateborn}`
        //console.log("str3: ", str)

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        ctx.font = "16px Arial";        
        let widthX = Math.round(ctx.measureText(str).width);

        setWidthStr3(widthX)
    }

    const onChangeName = (e) => {
        setWorkerName(e.target.value)

        setShowPulse2(true)
    }

    // const onChangeFamily = (e) => {
    //     setWorkerFam(e.target.value)
    // }

    // const handlePhone = (e)=>{
    //     setPhone(e.target.value)

    //     setShowPulse2(true)
    // }

    const onChangeCity = (e) => {
        console.log(e.target.value)
        setCity(e.target.value)    
    }

    const onChangeFriend = (e) => {
        setFriend(e.target.value)
        
        
    }

    const clickAddFrined = () => {
        console.log(check)
        //show save button
        //setShowMainBtn(true)

        setShowModal(false)

        setShowBlockCancel(true)
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

        const data = {
            workerName: workerName, 
            worklist: workers,
            city: city, 
            dateborn: dateborn.toString(), 
        }

        console.log(data)

        setShowPulse(false)
    }

    const clickCheck = () => {
        setCheck2(!check2)
        setShowMainBtn(!showMainBtn)
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
            workerName: workerName.trim(), 
            //phone,
            worklist: workers,
            city: city.trim(),
            dateborn: dateborn.toString(),
            friend: check ? Number(friend) : 0,
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
              
    }, [workerFam, workerName, phone, workers, city, dateborn, friend])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        if (showMainBtn) {
            tg.MainButton.setParams({
                text: 'Сохранить',
                color: '#000000' //'#2e2e2e'
            })
            tg.MainButton.enable()
        } else {
            tg.MainButton.setParams({
                text: 'Workhub',
                color: '#26292c' //'#2e2e2e'
            })
            tg.MainButton.disable()
        }
        // tg.MainButton.setParams({
        //     text: 'Сохранить',
        //     color: '#000000' //'#2e2e2e'
        // })
    }, [showMainBtn])

    useEffect(() => {
        tg.MainButton.show();
        // if (showMainBtn) {
        //    tg.MainButton.show(); 
        // } else {
        //     tg.MainButton.hide();  
        // }
        
    }, [])

    //-------------------------------------------------------------------

    useEffect(() => {
        //длина окна
        const widthD = width - (131 + 25)

        setWidthDX(widthD - widthStr)

        setShowBegun(false)
 
        setTimeout(()=> {
            if (widthStr > widthD) {
                setShowBegun(true)
            }
        }, 3000)

    }, [widthStr])

    useEffect(() => {
        //длина окна
        const widthD = width - (131 + 25)
        setWidthD(widthD)

        setWidthDX2(widthD - widthStr2)

        console.log("str2: ", widthStr2,  widthD - widthStr2)

        setTimeout(()=> {
            if (widthStr2 > widthD) {
                setShowBegun2(true)
            }
        }, 3000)

    }, [widthStr2])

    useEffect(() => {
        //длина окна
        const widthD = width - (131 + 25)
        setWidthD(widthD)

        setWidthDX3(widthD - widthStr3)

        console.log("str3: ", widthStr3,  widthD - widthStr3)

        setTimeout(()=> {
            if (widthStr3 > widthD) {
                setShowBegun3(true)
            }
        }, 3000)

    }, [widthStr3])

    const clickCity = (event, newValue)=> {
        console.log("event: ", event)
        if (event.length > 0) {
            setCity(event);
        }    
    }

    
    return (
        <div className="App">

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            {/* <img src={BlackFon} alt='' className='fon-black' style={{left: `${25 - width}px`, zIndex: '1'}} /> */}
            <img src={BlackFon} alt='' className='fon-black' style={{left: `${widthD}px`, zIndex: '1'}} />

            {/*Специализация*/}   
            <p style={{position: 'absolute', top: '25px', left: '25px', fontSize: '17px', color: '#fff', zIndex: '5'}}>
                Выберите свою специальность
            </p>

                       
            <div style={{position: 'relative', marginTop: '80px', marginLeft: '25px', marginRight: '25px', zIndex: '100'}}>
                <p className='cat-title' style={{display: titleCat ? 'none' : 'block'}}>Категория...</p>  
                <NewSelect
                    id="category"
                    options={categories}
                    titleCat={titleCat}
                    setTitleCat={setTitleCat}
                    onChange={onCategoriesSelectChange}
                /> 
            </div>
                          
            <div style={{position: 'relative', marginTop: '20px', marginLeft: '25px', marginRight: '25px', zIndex: '99'}}>
                <p className='spec-title' style={{display: titleSpec ? 'none' : 'block'}}>Специальность...</p> 
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
                {/*список работников*/}
                <div style={{
                    boxSizing: 'border-box', 
                    height: 'auto', 
                    zIndex: 20,
                    // marginTop: '15px',
                }}>
                    {/* <WorkerList remove={removeWorker} workers={workers} width={width} /> */}
                    {showBlockFam && 
                        showBegun && widthD < widthStr ? 
                        <div className='fio-text'><Marquee workers={workers} width={widthDX} /></div> 
                        : 
                        <div className='fio-text'><WorkerList remove={removeWorker} workers={workers} width={width} /></div>
                    }
                </div>  

                {/*кнопка Добавить*/}
                <button 
                    disabled={disabledBtn}
                    className="image-button-add" 
                    style={{ backgroundImage: `url(${btnSave})`}}
                    onClick={addNewWorker}
                >
                    Добавить
                </button> 
            </div>           
            
            <div style={{display: showBlockFam ? 'block' : 'none', height: '100px'}}>
                {/* Фамилия */}
                <div style={{position: 'relative', marginTop: '50px', marginLeft: '25px', marginRight: '25px', height: '43px', zIndex: '3'}}>
                    <div className='rec1-input'></div>
                    <div className='rec2-input'></div>
                    <div className='rec3-input'></div>
                    <input
                        className='input-style3'
                        placeholder='Имя'
                        id="worker_name"
                        onChange={onChangeName}
                        value={workerName}
                        disabled={disabledFIO}
                    /> 
                </div>

                {/* Имя */}
                {/* <div style={{position: 'relative', marginTop: '20px', marginLeft: '25px', marginRight: '25px', height: '43px', zIndex: '3'}}>
                    <div className='rec1-input'></div>
                    <div className='rec2-input'></div>
                    <div className='rec3-input'></div>
                    <input
                        className='input-style3'
                        placeholder='Никнейм / Псевдоним [необязательно]'
                        id="worker_soname"
                        variant="filled"
                        onChange={onChangeFamily}
                        value={workerFam}
                        disabled={disabledFIO}
                    />
                </div> */}        

                {/* Номер телефона */}
                {/* <div style={{position: 'relative', marginTop: '20px', marginLeft: '25px', marginRight: '25px', height: '43px', zIndex: '3'}}>
                    <div className='rec1-input'></div>
                    <div className='rec2-input'></div>
                    <div className='rec3-input'></div>
                    <InputMask
                        className='input-style3'
                        mask="+7 (999) 999-99-99"
                        disabled={disabledFIO}
                        maskChar=""
                        onChange={handlePhone} 
                        value={phone}
                        placeholder='Номер телефона'
                    >
                    </InputMask>
                </div> */}

                <div style={{position: 'relative', marginTop: '10px', marginRight: '25px', textAlign: 'left'}}>
                    {/* <p className='fio-text' style={{display: showFIO ? 'block' : 'none'}}>{workerFam} {workerName} | {phone}</p> */}
                    {showFIO && 
                        showBegun2 && widthD < widthStr2 ? 
                        <div className='fio-text'><Marquee workerFam={workerFam} workerName={workerName} phone={phone} width={widthDX2} /></div>
                        : 
                        <p className='fio-text' style={{
                            marginLeft: '25px', 
                            display: showFIO ? 'block' : 'none',
                            whiteSpace: 'nowrap'
                        }}>{workerFam} {workerName}</p>
                    }


                    {!showFIO ? 
                    <button 
                        disabled={false}
                        className={showPulse2 ? 'image-button-add pulse-button' : 'image-button-add'}
                        style={{ backgroundImage: `url(${btnSave})`}}
                        onClick={addNewWorker2}
                    >
                        Добавить
                    </button> 
                    :<button 
                        disabled={false}
                        className="image-button-add" 
                        style={{ backgroundImage: `url(${btnSave})`}}
                        onClick={editNewWorker2}
                    >
                        Изменить
                    </button> }
                </div>
            </div>


            <div style={{display: showBlockCity ? 'block' : 'none', height: '200px'}}>
                    {/*Город*/}
                <div style={{position: 'relative', marginTop: '25px', marginLeft: '25px', marginRight: '25px', height: '43px', zIndex: '3'}}>
                    <div className='rec1-input'></div>
                    <div className='rec2-input'></div>
                    <div className='rec3-input'></div>
                    {/* <input
                        className='input-style3'
                        placeholder='Город'
                        id="worker_name"
                        onChange={onChangeCity}
                        value={city}
                    />  */}
                    <Autocomplete
                        sx={{
                            display: 'inline-block',
                            '& input': {zIndex: '25',
                                width: '100%',
                                margin: '0 0',
                                border: 'none',
                                height: '43px',
                                padding: '0 20px',
                                color: '#fff',
                                borderRadius: '30px',
                                marginBottom: '20px',
                            }
                        }}
                        openOnFocus
                        id="custom-input-demo"
                        options={cityData}
                        style={{width: '100%'}}
                        onInputChange={onChangeCity}
                        //onInputChange={(e)=>clickCity(e)}
                        onChange={(event, newValue) => {
                            if (newValue && newValue.length) {
                                setCity(newValue);
                            }  
                        }}
                        value={city}
                        inputValue={city}
                        renderInput={(params) => (
                        <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                            <input 
                                type="text" {...params.inputProps} 
                                placeholder='Город'
                                //onChange={onChangeCity}
                                // value={city}
                            />
                        </div>
                        )}
                    />
                </div>

                

            
                {/*Год рождения*/}
                <div style={{position: 'relative', marginTop: '20px', marginLeft: '25px', marginRight: '25px', marginBottom: '-10px', zIndex: '99'}}>
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

                <div style={{position: 'relative', marginTop: '10px', marginRight: '25px', textAlign: 'left', marginBottom: '55px'}}>
                    {/* <p className='fio-text' style={{display: showDate ? 'block' : 'none'}}>{city} | {dateborn}</p> */}
                    {showDate && 
                        showBegun3 ? 
                        <div className='fio-text'><Marquee city={city} dateborn={dateborn} width={widthDX3}/></div>
                        :
                        <p className='fio-text' style={{marginLeft: '25px', display: showDate ? 'block' : 'none'}}>{city} | {dateborn}</p>
                    }

                    

                    {!showApply ? 
                    <button 
                        disabled={disabledBtn2}
                        className="image-button-add" 
                        style={{ backgroundImage: `url(${btnSave})`}}
                        onClick={addNewWorker3}
                    >
                        Добавить
                    </button> 
                    :  <button 
                            disabled={disabledBtn2}
                            className={`image-button-add ${showPulse ? 'pulse-button button-accept' : ''}`} 
                            style={{ backgroundImage: `url(${btnSave})`}}
                            onClick={clickApply}
                        >
                            Подтвердить
                        </button> }

                    
                </div>

            </div>

            <div style={{position: 'relative', display: showBlockCancel ? 'block' : 'none', zIndex: '10'}}>
                <div style={{position: 'absolute', bottom: '10px', left: '20px', display: 'flex', alignItems: 'center'}}>
                    <img 
                        src={check2 ? iconCheck : iconUnCheck} 
                        onClick={clickCheck} 
                        alt='' 
                        width='25px' 
                        height='25px'
                        className={`${!check2 ? 'pulse-check' : ''}`}
                        style={{border: !check2 ? '2px solid #1645c7' : '', borderRadius: '5.5px'}}
                    />
                    <p style={{marginRight: '10px', marginLeft: '15px', fontSize: '12px'}}>Согласие на передачу и обработку данных</p>
                </div>
            </div>


            <MyModal visible={showModal} setVisible={setShowModal}>
                <div className='info-card' style={{height: '220px'}}>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'>Получил промокод ID от друга?</p>
                    {/* <p className='text-vagno' style={{marginTop: '25px'}}>Добро пожаловать на борт!</p> */}
                    <div style={{position: 'absolute', top: '60px', left: '20px', display: 'flex', alignItems: 'center'}}>
                        {/* <input type="checkbox" id="scales" name="scales" checked /> */}
                        <img src={check ? iconCheck : iconUnCheck} onClick={()=>setCheck(!check)} alt='' width='20px' height='20px'/>
                        <label style={{marginRight: '10px', marginLeft: '15px'}}>Я использую  промокод ID</label>
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: '100px',
                        left: '0',
                        marginLeft: '25px', 
                        marginRight: '25px', 
                        height: '43px', 
                        width: '260px',
                        zIndex: '3',
                        display: check ? 'block' : 'none'
                    }}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <input
                            className='input-style3'
                            placeholder='Промокод ID'
                            id="friend_name"
                            onChange={onChangeFriend}
                            value={friend}
                        /> 
                    </div>
                    <div className='button-ok' onClick={clickAddFrined}>
                        <div className='rec-button'>{check ? "Применить" : "Пропустить"}</div>        
                    </div>
                </div>
            </MyModal>

        </div>
    );
};


export default NewWorker;