import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPassport2.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";

import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import InputMask from 'react-input-mask';
import Calendar from "../../image/calendar.svg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from "@mui/material";

import { useUsersContext } from "../../contexts/UserContext";

const NewPassport2 = () => {

    const navigate = useNavigate();

    const { 
        pasNumber, 
		setPasNumber,
		pasDate, 
		setPasDate,
		pasKem, 
		setPasKem,
		pasKod, 
		setPasKod
    } = useUsersContext();

    const [novalid, setNovalid] = useState(true)

    const [numDirty, setNumDirty] = useState(false)
    const [kemDirty, setKemDirty] = useState(false)
    const [kodDirty, setKodDirty] = useState(false)

    const [error, setError] = useState("")


    const pressNext = () => {      
        if (pasNumber.length === 11 && pasKem && pasKod) {
            console.log('да')
            navigate('/add-passport3')

        } else {
            console.log('нет')
            setNovalid(true) 
            setError('Заполните выделенные поля!')
            if (pasNumber.length !== 11) setNumDirty(true)
            if (!pasKem) setKemDirty(true)
            if (!pasKod) setKodDirty(true)
        }
    }

    // useEffect(() => {
    //     if (pasNumber.length === 11 && pasDate && pasKem && pasKod.length === 7) {
    //         setNovalid(false)
    //         setError('')
    //     } else {
    //         setError('Заполните выделенные поля!')
    //         if (pasNumber.length !== 11) setNumDirty(true)
    //         if (!pasKem) setKemDirty(true)
    //         if (!pasKod) setKodDirty(true)
    //     }
    // }, [pasNumber, pasDate, pasKem, pasKod]);

    const handleNumber = (e)=>{
        setPasNumber(e.target.value)
    }

    const handleDate = (e)=>{
        setPasDate(e.target.value)
    }

    const handleKem = (e)=>{
        setPasKem(e.target.value)
    }

    const handleKod = (e)=>{
        setPasKod(e.target.value)
    }

    return (
        <div className="App">
            <Header header={{title: 'Моя анкета', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>

            {(error && !pasNumber) && <div style={{color: 'red', position: 'absolute', left: '0', top: '70px', right: '0', marginLeft: 'auto', marginRight: 'auto'}}>{error}</div>}

            <div className='form-new2'>
                {/*Серия и номер*/}
                <div className="text-field text-field_floating" style={{border: numDirty ? '2px solid #b50808' : '', borderRadius: '10px'}}>
                    {/* <RedditTextField fullWidth
                                    label="Серия и номер"
                                    id="pas_number"
                                    variant="filled"
                                    onChange={handleNumber}
                                    value={pasNumber}
                    /> */}
                    <InputMask
                        mask="9999 999999"
                        disabled={false}
                        maskChar=""
                        onChange={handleNumber} 
                        value={pasNumber}
                    >
                        {() => <RedditTextField 
                                    fullWidth 
                                    label="Серия и номер"
                                    name='num'
                                    id="pas_number"
                                    variant="filled"/>}
                    </InputMask>
                </div>

                {/*Дата выдачи*/}
                <div className="text-field text-field_floating">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} style={{backgroundColor: '#2A2731', borderRadius: '10px'}}>
                            <RedditTextField
                                id="pas_date"
                                label="Дата выдачи"
                                type="date"
                                variant="filled"
                                value={pasDate}
                                onChange={handleDate}
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

                {/*Кем выдан*/}
                <div className="text-field text-field_floating" style={{border: kemDirty ? '2px solid #b50808' : '', borderRadius: '10px'}}>
                    <RedditTextField fullWidth
                                    label="Кем выдан"
                                    id="pas_kem"
                                    name='kem'
                                    variant="filled"
                                    onChange={handleKem}
                                    value={pasKem}
                    />
                </div>          

                {/*Код подразделения*/}
                <div className="text-field text-field_floating" style={{border: kodDirty ? '2px solid #b50808' : '', borderRadius: '10px'}}>
                    <InputMask
                        mask="999-999"
                        disabled={false}
                        maskChar=""
                        onChange={handleKod} 
                        value={pasKod}
                    >
                        {() => <RedditTextField 
                                    fullWidth 
                                    label="Код подразделения"
                                    name='kod'
                                    id="pas_kod"
                                    variant="filled"/>}
                    </InputMask>
                </div>

                <div className='block-buttons-new2'>
                    <Link to={'/add-passport'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton></Link>
                    <MyButton onClick={pressNext} style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Далее</MyButton>
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


export default NewPassport2;