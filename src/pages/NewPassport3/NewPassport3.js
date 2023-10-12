import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPassport3.css';
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
import axios from 'axios';

const NewPassport3 = () => {

    const { 
        pasPlaceborn, 
		setPasPlaceborn,
		pasAdress, 
		setPasAdress,
		pasEmail, 
		setPasEmail,
    } = useUsersContext();

    const [novalid, setNovalid] = useState(true)

    // useEffect(() => {
    //     //console.log(phone.length)
    //     if (workerFam && workerName && phone.length === 18) {
    //         setNovalid(false)
    //     } else {
    //         setNovalid(true) 
    //     }
    // }, [workerFam, workerName, phone]);

    const handlePlaceborn = (e)=>{
        setPasPlaceborn(e.target.value)
    }

    const handleAdress = (e)=>{
        setPasAdress(e.target.value)
    }

    const handleEmail = (e)=>{
        setPasEmail(e.target.value)
    }

    //-------------------------------------------

    // On file upload (click the upload button)
    const onFileUpload = () => {
 
        // Create an object of formData
        // const formData = new FormData();
 
        // // Update the formData object
        // formData.append(
        //     "myFile",
        //     this.state.selectedFile,
        //     this.state.selectedFile.name
        // );
 
        // // Details of the uploaded file
        // console.log(this.state.selectedFile);
 
        // // Request made to the backend api
        // // Send formData object
        // axios.post("api/uploadfile", formData);
    };
 
    // File content to be displayed after
    // file upload is complete
    const fileData = () => {
        // if (this.state.selectedFile) {
        //     return (
        //         <div>
        //             <h2>File Details:</h2>
        //             <p>File Name: {this.state.selectedFile.name}</p>
 
        //             <p>File Type: {this.state.selectedFile.type}</p>
 
        //             <p>
        //                 Last Modified:{" "}
        //                 {this.state.selectedFile.lastModifiedDate.toDateString()}
        //             </p>
 
        //         </div>
        //     );
        // } else {
        //     return (
        //         <div>
        //             <br />
        //             <h4>Choose before Pressing the Upload button</h4>
        //         </div>
        //     );
        // }
    };

    return (
        <div className="App">
            <Header header={{title: 'Паспортные данные', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>

            <div className='form-new2'>
                {/*Место рождения*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                    label="Место рождения"
                                    id="worker_soname"
                                    variant="filled"
                                    onChange={handlePlaceborn}
                                    value={pasPlaceborn}
                    />
                </div>

                {/*Адрес*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                    label="Адрес регистрации"
                                    id="worker_name"
                                    variant="filled"
                                    onChange={handleAdress}
                                    value={pasAdress}
                    />
                </div> 

                {/*Email*/}
                <div className="text-field text-field_floating">
                    <RedditTextField fullWidth
                                    label="Email"
                                    id="worker_name"
                                    variant="filled"
                                    onChange={handleEmail}
                                    value={pasEmail}
                    />
                </div> 

                <form>
                    <h3>Загрузить фото</h3>
                    <input type="file" />
                    <button type="submit">Добавить</button>
                </form>

                {/* <MyButton style={{ background: '#3f4052', border: '1px solid #3f4052'}}>Добавить фото</MyButton>          */}

                <div className='block-buttons-new2'>
                    <Link to={'/add-passport2'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton></Link>
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


export default NewPassport3;