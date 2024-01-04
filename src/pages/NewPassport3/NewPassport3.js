import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPassport3.css';

import BlackFon from "../../image/new/fon_grad.svg";

import {useTelegram} from "../../hooks/useTelegram";
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import { uploadFile } from './../../http/chatAPI';
import { useUsersContext } from "../../contexts/UserContext";
import uploadImg from "./../../image/iconUpload.png";

const NewPassport3 = () => {

    const API_URL = process.env.REACT_APP_API_URL
    const API_URL_HOST = process.env.REACT_APP_HOST
    const {tg, queryId, user} = useTelegram();

    const { 
        pasFam, 
			setPasFam,
    		pasName, 
			setPasName,
			pasSoname, 
			setPasSoname,
    		pasDateborn, 
			setPasDateborn,
			pasNumber, 
			setPasNumber,
			pasDate, 
			setPasDate,
			pasKem, 
			setPasKem,
			pasKod, 
			setPasKod,
			pasPlaceborn, 
			setPasPlaceborn,
			pasAdress, 
			setPasAdress,
			pasEmail, 
			setPasEmail,
    } = useUsersContext();

    const [novalid, setNovalid] = useState(true)
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [image, setImage]= useState("");

    const [placeDirty, setPlaceDirty] = useState(false)
    const [addressDirty, setAddressDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)

    const [error, setError] = useState("")

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    // useEffect(() => {
    //     if (pasPlaceborn && pasAdress && pasEmail) {
    //         setNovalid(false)
    //     } else {
    //         setNovalid(true) 
    //     }
    // }, [pasPlaceborn, pasAdress, pasEmail]);

    const pressNext = () => {      
        if (pasPlaceborn && pasAdress && pasEmail.includes("@")) {
            console.log('да')
            setPlaceDirty(false)
            setAddressDirty(false)  
            setEmailDirty(false)   
            setNovalid(false)

        } else {
            if (!pasPlaceborn) {
                setError('Заполните выделенные поля!')
                setPlaceDirty(true) 
            } else {
                setPlaceDirty(false)   
            } 

            if (!pasAdress) {
                setError('Заполните выделенные поля!')
                setAddressDirty(true)
            } else {
                setAddressDirty(false)  
            }

            if (!pasEmail.includes("@")) {
                setError('Заполните выделенные поля!')
                setEmailDirty(true)
            } else {
                setEmailDirty(false)  
            }

            setNovalid(true) 
        }
    }

    useEffect(() => {
        const getImage = async () => {
            if (selectedFile) {
              console.log("file:", selectedFile)
              const data = new FormData();
              data.append("name", selectedName);
              data.append("photo", selectedFile);
              
              let response = await uploadFile(data);
              console.log("response: ", response.data.path)
    
              setImage(API_URL_HOST + response.data.path.split('.team')[1]);
              //сообщение с ссылкой на файл
              console.log(API_URL_HOST + response.data.path.split('.team')[1])
              //setValue(host + response.data.path)
            }
        }
        getImage();
    }, [selectedFile])

    {/* Добавление файла */}
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setSelectedName(file.name);
        // Additional validation logic
    };

    const handlePlaceborn = (e)=>{
        setPasPlaceborn(e.target.value)
    }

    const handleAdress = (e)=>{
        setPasAdress(e.target.value)
    }

    const handleEmail = (e)=>{
        setPasEmail(e.target.value)

        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        // if (!re.test(String(e.target.value).toLowerCase)) {
        //     setEmailError('Некорректный email')
        // }
    }



    //-------------------------------------------


    //отправка данных в telegram-бот
    const onSendData = useCallback(() => {
        if (pasPlaceborn && pasAdress && pasEmail.includes("@")) {
            console.log('да')
            setPlaceDirty(false)
            setAddressDirty(false)  
            setEmailDirty(false)   
            setNovalid(false)

            const data = {
                pasFam, 
                pasName, 
                pasSoname, 
                pasDateborn, 
                pasNumber, 
                pasDate, 
                pasKem, 
                pasKod, 
                pasPlaceborn, 
                pasAdress, 
                pasEmail, 
                queryId,
                user,
                image
            }

            tg.MainButton.hide();
            
            
            fetch(API_URL + 'web-passport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

        } else {
            if (!pasPlaceborn) {
                setError('Заполните выделенные поля!')
                setPlaceDirty(true) 
            } else {
                setPlaceDirty(false)   
            } 

            if (!pasAdress) {
                setError('Заполните выделенные поля!')
                setAddressDirty(true)
            } else {
                setAddressDirty(false)  
            }

            if (!pasEmail.includes("@")) {
                setError('Заполните выделенные поля!')
                setEmailDirty(true)
            } else {
                setEmailDirty(false)  
            }

            setNovalid(true) 
        }
        
              
    }, [pasFam, pasName, pasSoname, pasDateborn, pasNumber, pasDate, pasKem, pasKod, pasPlaceborn, pasAdress, pasEmail, image ])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить анкету',
            color: '#000000' //'#2e2e2e'
        })
    }, [])

    useEffect(() => {
        if (pasPlaceborn && pasAdress && pasEmail.includes("@")) {
            tg.MainButton.show();
            console.log("yes")
       } else {
            tg.MainButton.hide();
            console.log("no")
       }
        
    }, [pasPlaceborn, pasAdress, pasEmail])

    return (
        <div className="App">
            <Header header={{title: 'Моя аккредитация', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />

            {/* Предупреждение */}
            <div style={{
                        visibility: (error && !pasPlaceborn || !pasAdress || !pasEmail) ? 'visible' : 'hidden',
                        color: 'red', 
                        fontSize: '18px',
                        position: 'absolute',
                        top: 'calc(20vh - 25px)',
                        width: '100%',
                    }}>{error}
            </div>

            <div style={{display: 'flex', height: '100vh', padding: '0 25px'}}>            
            
                <div style={{width: '100%', marginTop: '40px'}}>
                    <div className="header-fio">
                        <p>Адрес</p>
                        <p>Шаг 3/3</p>
                    </div>
                    {/*Место рождения*/}
                    <div style={{position: 'relative', marginTop: '20px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <input
                            className='input-style3'
                            placeholder='Место рождения'
                            id="worker_soname"
                            variant="filled"
                            onChange={handlePlaceborn}
                            value={pasPlaceborn}
                            style={{border: placeDirty ? '1px solid #ff0000' : ''}}
                        />  
                    </div> 

                    {/* Адрес регистрации */}
                    <div style={{position: 'relative', marginTop: '20px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <input
                            className='input-style3'
                            placeholder='Адрес регистрации'
                            id="worker_name"
                            variant="filled"
                            onChange={handleAdress}
                            value={pasAdress}
                            style={{border: addressDirty ? '1px solid #ff0000' : ''}}
                        /> 
                    </div>
                    

                    {/* Email */}
                    <div style={{position: 'relative', marginTop: '20px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <input
                            className='input-style3'
                            placeholder='Email'
                            id="worker_name"
                            variant="filled"
                            onChange={handleEmail}
                            value={pasEmail}
                            style={{border: emailDirty ? '1px solid #ff0000' : ''}}
                        /> 
                    </div> 

                    {/* Фото для аккредитации */}
                    <div style={{position: 'relative', marginTop: '20px', width: '100%', height: '43px'}}>
                        <div className='rec1-input'></div>
                        <div className='rec2-input'></div>
                        <div className='rec3-input'></div>
                        <div className="file-upload">
                        <p>{selectedName || "Фото для аккредитации"}</p><img src={uploadImg} alt="upload" width={30} height={30} />
                        <input
                            className='input-style3'
                            type="file" 
                            name="photo" 
                            onChange={handleFileChange}
                        /> 
                        </div> 
                    </div>  

                    <div className='block-button' style={{padding: '0'}}>
                        <div className='button1' >Назад</div>
                        <div className='button2' onClick={pressNext}>Подтвердить</div>
                    </div>   

                </div>

            </div>
            
        </div>
    );
};



export default NewPassport3;