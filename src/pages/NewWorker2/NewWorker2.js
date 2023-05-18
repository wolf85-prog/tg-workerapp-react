import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import WorkerList from "../../components/WorkerList/WorkerList";
import './NewWorker2.css';
import Calendar from "../../image/calendar.svg";

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";

import specData from "../../data/specData"

import InputMask from 'react-input-mask';

const API_URL = process.env.REACT_APP_API_URL

const NewWorker2 = () => {
    const {tg, queryId, user} = useTelegram();

    //работник
    const [worker, setWorker] = useState({id: '', cat: '', spec: '', icon: ''})
    //специальности
    const [workers, setWorkers] = useState([])

    const [dateborn, setDateborn] = useState('2000-01-01');
    const [phone, setPhone] = useState();

    //категории
    const [categories, setCategories] = useState([]);
    //специальности
    const [models, setModels] = useState([]);

    const [modal, setModal] = useState(false)
    const [showWorkadd, setShowWorkadd] = useState(false)
    const [showEquipmentadd, setShowEquipmentadd] = useState(false)
    const [showSpec, setShowSpec] = useState(false)
    const [showName, setShowName] = useState(false)
    const [showSubname, setShowSubname] = useState(false)

    //select
    const [selectedElement, setSelectedElement] = useState("")
    //select2
    const [selectedElement2, setSelectedElement2] = useState("")

    const [isLoading, setIsLoading] = useState(false);

    const [disabledBtn, setDisabledBtn] = useState(true)

    const [disabled, setDisabled] = useState(true)
    const [disabled2, setDisabled2] = useState(true)

    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

        // устанавливаем категории
        if (specData.length > 0 && specData) {
            setCategories(specData);
        }

        // и модели из первой категории по умолчанию
        if (specData.length > 0 && specData[0].models && specData[0].models.length > 0) {
            setModels(specData[0].models);
        }

    }, []);

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


    {/* Добавление работника */}
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

            <form>
                

                {/*Специализация*/}
                <div>
                    <label>
                        <p
                            style={{
                                margin: '20px 5px',
                                display: 'flex',
                                fontSize: '14px',
                                color: '#76A9FF',
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
                            style={{marginBottom: "15px", width: "220px"}}
                            onClick={addNewWorker}
                        >Добавить
                        </MyButton>
                    </p>

                </div>

                {/*список работников*/}
                <WorkerList remove={removeWorker} workers={workers} />
                
                <div className='block-buttons'>
                    <Link to={'/'}><MyButton style={{width: "80px"}}>Назад</MyButton></Link>
                    <Link to={'/add-worker3'}><MyButton style={{width: "80px"}}>Далее</MyButton></Link> 
                </div>
                               
            </form>
            
        </div>
    );
};

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props}  />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        border: '2px solid #76A9FF',
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}));


export default NewWorker2;