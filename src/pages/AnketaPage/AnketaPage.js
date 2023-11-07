import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './AnketaPage.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import smallMenu from "../../image/layers/ULEY text.png"

import MyButton from "../../components/UI/MyButton/MyButton";


const AnketaPage = () => {

    const navigate = useNavigate();

    const [showPage1, setShowPage1] = useState(true)
    const [showPage2, setShowPage2] = useState(false)
    const [showPage3, setShowPage3] = useState(false)

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    })

    const pagePassport = () => {
        navigate('/add-passport')
    }

    const page2 = (e) => {
        e.preventDefault();
        setShowPage2(true)
        setShowPage3(false)
        setShowPage1(false)
    }

    const page3 = (e) => {
        e.preventDefault();
        setShowPage3(true)
        setShowPage2(false)
        setShowPage1(false)
    }

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: '', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            
            <form>
                {/* page1 */}
                <div style={{marginTop: '250px', display: showPage1 ? "block" : 'none', position: 'relative', zIndex: '10'}}>                  
                    <p
                        style={{
                            margin: '20px 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '20px',
                            color: '#fff',
                        }}> Добрый день.
                        На связи автоматическая система U.L.E.Y | Workhub.
                        
                        Для участия в предстоящем проекте необходимо предоставить паспортные данные.
                        
                        Продолжив, ты соглашаешся предоставить персональные данные исключительно для передачи их заказчику.
                    </p> 

                    <div>
                        <MyButton onClick={pagePassport} style={{width: "80%", background: '#3f4052', border: '1px solid #3f4052'}}>Согласен предоставить персональные данные</MyButton>
                        <MyButton onClick={page3} style={{width: "80%", background: '#3f4052', border: '1px solid #3f4052'}}>Отказываюсь от предоставления данных и участия в проектах</MyButton>
                        <MyButton onClick={page2} style={{width: "80%", background: '#3f4052', border: '1px solid #3f4052'}}>Пояснения</MyButton>  
                    </div>      
                </div>

                 {/* page2  */}
                 <div style={{marginTop: '250px', display: showPage3 ? "block" : 'none', position: 'relative', zIndex: '10'}}>                  
                    <p
                        style={{
                            margin: '20px 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '20px',
                            color: '#fff',
                        }}> Ваш отказ принят.
                        До встречи на следующем проекте!
                    </p>      
                </div>

                 {/* page3  */}
                 <div style={{marginTop: '250px', display: showPage2 ? "block" : 'none', position: 'relative', zIndex: '10'}}>                  
                    <p
                        style={{
                            margin: '20px 5px',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '20px',
                            color: '#fff',
                        }}> Иногда заказчики требуют персональные данные  специалистов приглашенных на проект, 
                        в этом случае участие в нем возможно только после предоставления необходимых данных.
                    </p> 

                    <div>
                        <MyButton onClick={pagePassport} style={{width: "80%", background: '#3f4052', border: '1px solid #3f4052'}}>Согласен предоставить персональные данные</MyButton>
                        <MyButton onClick={page3} style={{width: "80%", background: '#3f4052', border: '1px solid #3f4052'}}>Отказываюсь от предоставления данных и участия в проектах</MyButton> 
                    </div>      
                </div>
            </form>   

            <div style={{position: 'fixed', bottom: '25px', right: '0'}}>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '25px', width: '120px'}} />
            </div>      
        </div>
    );
};


export default AnketaPage;