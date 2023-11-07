import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPassport3.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import smallMenu from "../../image/layers/ULEY text.png"
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


    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    })

    // useEffect(() => {
    //     if (pasPlaceborn && pasAdress && pasEmail) {
    //         setNovalid(false)
    //     } else {
    //         setNovalid(true) 
    //     }
    // }, [pasPlaceborn, pasAdress, pasEmail]);

    const pressNext = () => {      
        if (pasPlaceborn && pasAdress && pasEmail) {
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

            if (!pasEmail) {
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
        
              
    }, [pasFam, pasName, pasSoname, pasDateborn, pasNumber, pasDate, pasKem, pasKod, pasPlaceborn, pasAdress, pasEmail, image ])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить анкету'
        })
    }, [])

    useEffect(() => {
        if (!novalid) {
            tg.MainButton.show();
        } else {
            tg.MainButton.hide();
        }
        
    }, [novalid])

    return (
        <div className="App">
            <Header header={{title: 'Моя анкета', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            {(error && !pasPlaceborn || !pasAdress || !pasEmail) && 
                <div style={{
                    color: 'red', 
                    fontSize: '18px',
                    position: 'absolute', 
                    left: '0', 
                    top: '70px', 
                    right: '0', 
                    marginLeft: 'auto', 
                    marginRight: 'auto'}}>
                        {error}
                </div>
            }

            <div className='form-new2'>
                {/*Место рождения*/}
                <div className="text-field text-field_floating">
                    {placeDirty ? <RedditTextFieldNovalid 
                                    fullWidth
                                    label="Место рождения"
                                    id="worker_soname"
                                    variant="filled"
                                    onChange={handlePlaceborn}
                                    value={pasPlaceborn}
                                />
                                :<RedditTextField 
                                    fullWidth
                                    label="Место рождения"
                                    id="worker_soname"
                                    variant="filled"
                                    onChange={handlePlaceborn}
                                    value={pasPlaceborn}
                                />}
                </div>

                {/*Адрес*/}
                <div className="text-field text-field_floating">
                    {addressDirty ? <RedditTextFieldNovalid
                                    fullWidth
                                    label="Адрес регистрации"
                                    id="worker_name"
                                    variant="filled"
                                    onChange={handleAdress}
                                    value={pasAdress}
                    />
                    :<RedditTextField fullWidth
                                    label="Адрес регистрации"
                                    id="worker_name"
                                    variant="filled"
                                    onChange={handleAdress}
                                    value={pasAdress}
                    />}
                </div> 

                {/*Email*/}
                <div className="text-field text-field_floating">
                    {emailDirty ? <RedditTextFieldNovalid 
                                    fullWidth
                                    label="Email"
                                    id="worker_name"
                                    variant="filled"
                                    onChange={handleEmail}
                                    value={pasEmail}
                    />
                    :<RedditTextField fullWidth
                                    label="Email"
                                    id="worker_name"
                                    variant="filled"
                                    onChange={handleEmail}
                                    value={pasEmail}
                    />}
                </div> 

                <div className="file-upload">
                    <p>{selectedName || "Фото для аккредитации"}</p><img src={uploadImg} alt="upload" width={30} height={30} />
                    <input type="file" name="photo" onChange={handleFileChange}/>
                </div>
                {/* <MyButton style={{marginBottom: "15px", width: "150px"}} onClick={handleSubmit}>Отправить</MyButton> */}

                <div className='block-buttons-new2'>
                    <Link to={'/add-passport2'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton></Link>
                    <MyButton onClick={pressNext} style={{width: "auto", background: '#3f4052', border: '1px solid #3f4052'}}>Сохранить</MyButton>
                </div>

                <div style={{position: 'fixed', bottom: '25px', right: '0'}}>
                    <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '25px', width: '120px'}} />
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


export default NewPassport3;