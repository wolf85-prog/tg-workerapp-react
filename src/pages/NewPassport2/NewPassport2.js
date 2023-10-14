import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
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

    useEffect(() => {
        if (pasNumber.length === 12 && pasDate && pasKem && pasKod.length === 7) {
            setNovalid(false)
        } else {
            setNovalid(true) 
        }
    }, [pasNumber, pasDate, pasKem, pasKod]);

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

            <div className='form-new2'>
                {/*Серия и номер*/}
                <div className="text-field text-field_floating">
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
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                    label="Кем выдан"
                                    id="pas_kem"
                                    variant="filled"
                                    onChange={handleKem}
                                    value={pasKem}
                    />
                </div>          

                {/*Код подразделения*/}
                <div className="text-field text-field_floating">
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
                                    id="pas_kod"
                                    variant="filled"/>}
                    </InputMask>
                </div>

                <div className='block-buttons-new2'>
                    <Link to={'/add-passport'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton></Link>
                    <Link to={'/add-passport3'}><MyButton disabled={novalid} style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Далее</MyButton></Link>
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