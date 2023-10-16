import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewPassport3.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";
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

    useEffect(() => {
        if (pasPlaceborn && pasAdress && pasEmail) {
            setNovalid(false)
        } else {
            setNovalid(true) 
        }
    }, [pasPlaceborn, pasAdress, pasEmail]);

    const pressNext = () => {      
        if (pasPlaceborn && pasAdress && pasEmail) {
            console.log('да')

            setNovalid(false)

        } else {
            console.log('нет')
            setNovalid(true) 

            setError('Заполните выделенные поля!')

            if (!pasPlaceborn) setPlaceDirty(true)
            if (!pasAdress) setAddressDirty(true)
            if (!pasEmail) setEmailDirty(true)
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
        if (!novalid)
        tg.MainButton.show();
    }, [])

    return (
        <div className="App">
            <Header header={{title: 'Моя анкета', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/>

            {(error && !pasPlaceborn || !pasAdress || !pasEmail) && 
                <div style={{
                    color: 'red', 
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
                <div className="text-field text-field_floating" style={{border: placeDirty ? '2px solid #b50808' : '', borderRadius: '10px'}}>
                    <RedditTextField fullWidth
                                    label="Место рождения"
                                    id="worker_soname"
                                    variant="filled"
                                    onChange={handlePlaceborn}
                                    value={pasPlaceborn}
                    />
                </div>

                {/*Адрес*/}
                <div className="text-field text-field_floating" style={{border: addressDirty ? '2px solid #b50808' : '', borderRadius: '10px'}}>
                    <RedditTextField fullWidth
                                    label="Адрес регистрации"
                                    id="worker_name"
                                    variant="filled"
                                    onChange={handleAdress}
                                    value={pasAdress}
                    />
                </div> 

                {/*Email*/}
                <div className="text-field text-field_floating" style={{border: emailDirty ? '2px solid #b50808' : '', borderRadius: '10px'}}>
                    <RedditTextField fullWidth
                                    label="Email"
                                    id="worker_name"
                                    variant="filled"
                                    onChange={handleEmail}
                                    value={pasEmail}
                    />
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