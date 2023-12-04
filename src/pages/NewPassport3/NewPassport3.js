import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPassport3.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";
import FonGradWhite from "../../image/layers/grad_white.png";
import btnNextSend from "../../image/newpassport/button_next_send.png"
import btnBack from "../../image/newpassport/icon_back.png"

import smallMenu from "../../image/layers/logo_04_light.png"
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
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх 
    })

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
            <Header header={{title: 'Моя анкета', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            {/* {(error && !pasPlaceborn || !pasAdress || !pasEmail) && 
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
            } */}

            {/* белый градиент */}
            <div  style={{display: 'flex', height: '100vh', position: 'absolute', zIndex: '2'}}>
                <img src={FonGradWhite} alt='' className='fon-style-white'/>
            </div>

            {/* Предупреждение */}
            <div style={{
                        visibility: (error && !pasPlaceborn || !pasAdress || !pasEmail) ? 'visible' : 'hidden',
                        color: 'red', 
                        fontSize: '18px',
                        position: 'absolute',
                        top: 'calc(30vh - 25px)',
                        width: '100%',
                    }}>{error}
            </div>

            <div style={{display: 'flex', height: '100vh', padding: '0 25px', overflow: 'auto'}}>            
                
                {/* Чёрная плашка */}
                <div className='form-new-passport'>
                    
                    {/*Место рождения*/}
                    <div style={{position: 'relative', marginTop: '30px', marginLeft: '25px', marginRight: '25px'}}>
                        <input
                            className='input-style2'
                            placeholder='Место рождения'
                            id="worker_soname"
                            variant="filled"
                            onChange={handlePlaceborn}
                            value={pasPlaceborn}
                            style={{border: placeDirty ? '1px solid #ff0000' : ''}}
                        />  
                    </div> 

                    {/* Адрес регистрации */}
                    <div style={{marginLeft: '25px', marginRight: '25px'}}>
                        <input
                            className='input-style2'
                            placeholder='Адрес регистрации'
                            id="worker_name"
                            variant="filled"
                            onChange={handleAdress}
                            value={pasAdress}
                            style={{border: addressDirty ? '1px solid #ff0000' : ''}}
                        /> 
                    </div>
                    

                    {/* Email */}
                    <div style={{marginLeft: '25px', marginRight: '25px'}}>
                       <input
                            className='input-style2'
                            placeholder='Email'
                            id="worker_name"
                            variant="filled"
                            onChange={handleEmail}
                            value={pasEmail}
                            style={{border: emailDirty ? '1px solid #ff0000' : ''}}
                        /> 
                    </div> 

                    {/* Фото для аккредитации */}
                    <div style={{marginLeft: '25px', marginRight: '25px'}}>
                        <div className="file-upload">
                        <p>{selectedName || "Фото для аккредитации"}</p><img src={uploadImg} alt="upload" width={30} height={30} />
                        <input
                                type="file" 
                                name="photo" 
                                onChange={handleFileChange}
                            /> 
                        </div> 
                    </div>    

                        {/* <button 
                            // disabled={disabledBtn}
                            className="image-button-pas" 
                            style={{ backgroundImage: `url(${btnNextSend})`}}
                            onClick={pressNext}
                        >
                            Отправить анкету
                        </button> */}
                </div>


                
                {/* <MyButton style={{marginBottom: "15px", width: "150px"}} onClick={handleSubmit}>Отправить</MyButton> */}

                {/* <div className='block-buttons-new2'>
                    <Link to={'/add-passport2'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton></Link>
                    <MyButton onClick={pressNext} style={{width: "auto", background: '#3f4052', border: '1px solid #3f4052'}}>Сохранить</MyButton>
                </div> */}

                {/* <div style={{position: 'fixed', bottom: '25px', right: '0'}}>
                    <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '25px', width: '120px'}} />
                </div> */}

                <div className='footer-block' style={{position: 'fixed', bottom: '25px', right: '0'}}>
                    <Link to={'/add-passport2'}><img src={btnBack} alt='' /></Link>
                    <img src={smallMenu} alt='' className='small-menu-icon' />
                </div>

            </div>
            
        </div>
    );
};



export default NewPassport3;