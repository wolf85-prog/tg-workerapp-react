import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './AnketaPage.css';

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"

import btnApplyCancel from "../../image/newpassport/button_apply.png"
import btnInfo from "../../image/newpassport/button_info.png"

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
                <div style={{marginTop: '200px', display: showPage1 ? "block" : 'none', position: 'relative', zIndex: '10'}}>                  
                    <div style={{
                            margin: '20px 25px',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            fontSize: '18px',
                            color: '#fff',
                        }}>
                        <p> Добрый день,   </p> 
                        <p>На связи система U.L.E.Y | Workhub.</p>
                    </div>

                    <div>
                        <button onClick={pagePassport} class="image-button-anketa" style={{ backgroundImage: `url(${btnApplyCancel})`}}>Согласен предоставить персональные данные</button>
                        <button onClick={page3} class="image-button-anketa" style={{ backgroundImage: `url(${btnApplyCancel})`}}>Отказываюсь от предоставления данных и участия в проекте</button>
                        <button onClick={page2} class="image-button-anketa2" style={{ backgroundImage: `url(${btnInfo})`}}>Пояснения</button>
                    </div>      
                </div>

                 {/* page2  */}
                 <div style={{display: showPage3 ? "block" : 'none', position: 'relative', zIndex: '10'}}>                  
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', margin: '0px 25px'}}> 
                        <p
                            style={{
                                fontSize: '20px',
                                color: '#fff',
                            }}> Ваш отказ принят. 
                        </p>  
                        <p style={{
                                fontSize: '20px',
                                color: '#fff',
                            }}>До встречи на следующем проекте!
                        </p>  
                    </div>  
                </div>

                 {/* page3  */}
                 <div style={{marginTop: '200px', display: showPage2 ? "block" : 'none', position: 'relative', zIndex: '10'}}>                  
                    <p
                        style={{
                            margin: '20px 25px',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '18px',
                            color: '#fff',
                        }}> Служба безопасности требует предоставить информацию о специалистах приглашенных на проект, в этом случае участие возможно только после предоставления персональных данных.
                    </p> 

                    <div>
                        <button onClick={pagePassport} class="image-button-anketa" style={{ backgroundImage: `url(${btnApplyCancel})`}}>Согласен предоставить персональные данные</button>
                        <button onClick={page3} class="image-button-anketa" style={{ backgroundImage: `url(${btnApplyCancel})`}}>Отказываюсь от предоставления данных и участия в проекте</button>
                    </div>      
                </div>
            </form>   

            <div className='footer-block' style={{bottom: '0'}}>
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>     
        </div>
    );
};


export default AnketaPage;