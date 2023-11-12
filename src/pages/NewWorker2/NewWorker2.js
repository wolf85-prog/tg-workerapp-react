import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './NewWorker2.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";
import FonGradWhite from "../../image/layers/grad_white.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"

import btnBackNext from "../../image/newspec/button_back.png"

import InputMask from 'react-input-mask';

import { useUsersContext } from "./../../contexts/UserContext";

const NewWorker2 = () => {

    const { workerFam, setWorkerFam, workerName, setWorkerName, phone, setPhone } = useUsersContext();
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

    const [novalid, setNovalid] = useState(true)

    useEffect(() => {
        //console.log(phone.length)
        if (workerFam && workerName && phone.length === 18) {
            setNovalid(false)
        } else {
            setNovalid(true) 
        }
    }, [workerFam, workerName, phone]);

    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    })

    const onChangeFamily = (e) => {
        setWorkerFam(e.target.value)
    }

    const onChangeName = (e) => {
        setWorkerName(e.target.value)
    }

    const handlePhone = (e)=>{
        setPhone(e.target.value)
        //console.log(phone.length)
    }

    return (
        <div className="App">
            <Header header={{title: 'Новый специалист', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            {/* белый градиент */}
            <div  style={{display: 'flex', height: '100vh', position: 'absolute', zIndex: '2'}}>
                <img src={FonGradWhite} alt='' className='fon-style-white'/>
            </div>

            <div style={{display: 'flex', height: '100vh', padding: '0 25px'}}>

                <div className='form-new-worker2'>
                    {/* Фамилия */}
                    <div style={{position: 'relative', marginTop: '25px', marginLeft: '30px', marginRight: '30px'}}>
                        <input
                            className='input-style2'
                            placeholder='Фамилия'
                            id="worker_soname"
                            variant="filled"
                            onChange={onChangeFamily}
                            value={workerFam}
                        />
                    </div>

                    {/* Имя */}
                    <div style={{position: 'relative', marginTop: '5px', marginLeft: '30px', marginRight: '30px'}}>
                       <input
                            className='input-style2'
                            placeholder='Имя'
                            id="worker_name"
                            onChange={onChangeName}
                            value={workerName}
                        /> 
                    </div>
                    

                    {/* Номер телефона */}
                    <div style={{position: 'relative', marginTop: '5px', marginLeft: '30px', marginRight: '30px'}}>
                        <InputMask
                            className='input-style2'
                            mask="+7 (999) 999-99-99"
                            disabled={false}
                            maskChar=""
                            onChange={handlePhone} 
                            value={phone}
                            placeholder='Номер телефона'
                        >
                        </InputMask>
                    </div>
                    

                    <div className='block-buttons-worknew2'>
                        <Link to={'/add-worker'}><button class="image-button-next2" style={{backgroundImage: `url(${btnBackNext})`}}>Назад</button></Link>
                        <Link to={'/add-worker3'}><button class="image-button-next2" style={{backgroundImage: `url(${btnBackNext})`}}>Далее</button></Link>
                        {/* <Link to={'/add-worker3'}><button class="image-button-next" disabled={novalid} style={{backgroundImage: `url(${btnBackNext})`}}>Далее</button></Link> */}
                    </div>
                </div>

            </div>   

            <div style={{position: 'fixed', bottom: '25px', right: '0'}}>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '25px', width: '120px'}} />
            </div>
            
        </div>
    );
};

// const RedditTextField = styled((props) => (
//     <TextField InputProps={{ disableUnderline: true }} {...props}  />
// ))(({ theme }) => ({
//     '& .MuiFilledInput-root': {
//         height: '55px',
//         border: '2px solid #2e7cff',
//         overflow: 'hidden',
//         borderRadius: 10,
//         backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2A2731',
//         transition: theme.transitions.create([
//             'border-color',
//             'background-color',
//             'box-shadow',
//         ]),
//         '&:hover': {
//             backgroundColor: 'transparent',
//         },
//         '&.Mui-focused': {
//             backgroundColor: 'transparent',
//             boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
//             borderColor: theme.palette.primary.main,
//         },
//     },
// }));


export default NewWorker2;