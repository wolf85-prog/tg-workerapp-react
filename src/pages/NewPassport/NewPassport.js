import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPassport.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
import { useUsersContext } from "../../contexts/UserContext";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import InputMask from 'react-input-mask';
import Calendar from "../../image/calendar.svg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL

const NewPassport = () => {
    const navigate = useNavigate();

    const {user} = useTelegram();

    const { 
        pasFam, setPasFam, 
        pasName, setPasName, 
        pasSoname, setPasSoname, 
        pasDateborn, setPasDateborn 
    } = useUsersContext();

    const [novalid, setNovalid] = useState(true)

    const [famDirty, setFamDirty] = useState(false)
    const [nameDirty, setNameDirty] = useState(false)
    const [datebornDirty, setDatebornDirty] = useState(false)
    const [famError, setFamError] = useState("")

    // useEffect(() => {
    //     //console.log(phone.length)
    //     if (pasFam && pasName && pasDateborn) {
    //         setNovalid(false)
    //         setFamError('')
    //     } else {
    //         setNovalid(true) 
    //         setFamError('Есть не заполненные поля!')
    //         if (!pasFam) setFamDirty(true)
    //         if (!pasName) setNameDirty(true)
    //         if (!pasDateborn) setDatebornDirty(true)
    //     }
    // }, [pasFam, pasName, pasDateborn]);

    const pressNext = () => {      
        if (pasFam && pasName && pasDateborn) {
            console.log('да')

            navigate('/add-passport2')

        } else {
            console.log('нет')
            setNovalid(true) 
            setFamError('Заполните выделенные поля!')
            if (!pasFam) setFamDirty(true)
            if (!pasName) setNameDirty(true)
            if (!pasDateborn) setDatebornDirty(true)
        }
    }

    const onChangeFamily = (e) => {
        setPasFam(e.target.value)

        // const re= /^[а-яА-Я]+$/;
        // if (!re.test(String(e.target.value).toLowerCase())) {
        //     setFamError('Некорректная фамилия')
        // } else {
        //     setFamError("")
        // }
    }

    const onChangeName = (e) => {
        setPasName(e.target.value)
    }

    const onChangeSoname = (e) => {
        setPasSoname(e.target.value)
    }

    const onChangeTime = (e) => {
        setPasDateborn(e.target.value)
    }



    //---------------------------------------------------------------------------------------


    return (
        <div className="App">
            <Header header={{title: 'Моя анкета', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>
  
            {(famError && !pasFam || !pasName || !pasDateborn) && 
            <div style={{
                color: 'red', 
                position: 'absolute', 
                left: '0', 
                top: '70px', 
                right: '0', 
                marginLeft: 'auto', 
                marginRight: 'auto'}}>{famError}
            </div>}

            <div className='form-new2'>    
                
                {/*Фамилия*/}
                <div className="text-field text-field_floating">
                    {famDirty ? <RedditTextFieldNovalid 
                                    fullWidth
                                    label="Фамилия"
                                    name='fam'
                                    id="pas_family"
                                    variant="filled"
                                    onChange={onChangeFamily}
                                    value={pasFam}
                                />
                                :<RedditTextField fullWidth
                                    label="Фамилия"
                                    name='fam'
                                    id="pas_family"
                                    variant="filled"
                                    onChange={onChangeFamily}
                                    value={pasFam}
                                />}
                </div>           

                {/*Имя*/}
                <div className="text-field text-field_floating">
                    {nameDirty ? <RedditTextFieldNovalid 
                                    fullWidth
                                    label="Имя"
                                    id="pas_name"
                                    name='name'
                                    variant="filled"
                                    onChange={onChangeName}
                                    value={pasName}
                    />
                                :<RedditTextField 
                                    fullWidth
                                    label="Имя"
                                    id="pas_name"
                                    name='name'
                                    variant="filled"
                                    onChange={onChangeName}
                                    value={pasName}
                                />}
                </div> 
                

                {/*Отчество*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                    label="Отчество"
                                    id="pas_soname"
                                    variant="filled"
                                    onChange={onChangeSoname}
                                    value={pasSoname}
                                    InputLabelProps={{
                                        istyle: true,
                                    }}
                    />
                </div>        

                {/*Сколько лет*/}
                {/*Дата начала*/}
                <div className="text-field text-field_floating" style={{border: datebornDirty ? '2px solid #b50808' : '', borderRadius: '10px'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} style={{backgroundColor: '#2A2731', borderRadius: '10px'}}>
                            <RedditTextField
                                id="date"
                                label="Дата рождения"
                                name='date'
                                type="date"
                                variant="filled"
                                value={pasDateborn}
                                onChange={onChangeTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <span className="open-button">
                              <button type="button"><img src={Calendar} alt='calendar'/></button>
                            </span>
                        </Stack>
                    </LocalizationProvider>
                </div>
                

                <div className='block-buttons-new2'>
                    <MyButton onClick={pressNext} style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Далее</MyButton>
                    {/* <Link to={'/add-passport2'}><MyButton onClick={pressNext} style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Далее</MyButton></Link> */}
                </div>

            </div>

        </div>
    );
};

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props}  />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        height: '55px',
        border: '2px solid #2e7cff',
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

const RedditTextFieldNovalid = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props}  />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        height: '55px',
        border: '2px solid #b50808',
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

export default NewPassport;