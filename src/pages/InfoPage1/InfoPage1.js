import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import './InfoPage1.css';
import MyButton from "../../components/UI/MyButton/MyButton";

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/logo_04_light.png"

const InfoPage1 = () => {
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх 
    });

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'С чего начать', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
            
            
            <form>
                <div className='container'>                  
                    <p className='text-info1'> 
                        Мы с удовольствием будем работать с вами и подберем для вас подходящую работу!
                    <br/><br/>
                    ✅ Всего два важных момента:<br/>
                    1. Возраст — 18 полных лет и более!<br/>
                    2. Паспорт гражданина РФ / РБ, или гражданство позволяющее оформить самозанятость.
                    <br/><br/>
                    ✅ Что делать?<br/>
                    1. Регистрируйся в Telegram в чат-боте: https://t.me/ULEY_Workhub_Bot. <br/>
                    Заполни все пункты и заверши процесс регистрации.<br/>
                    2. Оформи себя как самозанятого через приложение «Мой Налог».<br/>
                    3. Подпиши на сайте Договор Оферту с нами в форме анкеты. <br/>
                    https://uley.team/specialization
                    <br/><br/>
                    В чат-боте? Или при подписании договора?<br/>
                    — Выбери одну или несколько специальностей [отдел, фронт работ], это влияет на получение нужной рассылки;<br/>
                    — После регистрации в чат-бот будут приходить заявки по выбранным специальностям.<br/>
                    — Получив новую заявку в рассылке, внимание на  дату и время начала проекта, если он Вам подходит нажмите кнопку "Принять";<br/>
                    — Далее возьмите ссылку https://t.me/ULEY_Workhub_Bot и начинайте рекомендовать ее всем своим друзьям!
                    </p>         
                </div> 
                {/* <div className='block-buttons-info1'>
                    <Link to={'/info'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton></Link>
                </div> */}
            </form>   

            <div className='footer-block'>
                <Link to={'/info'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' className='small-menu-icon' />
            </div>      
        </div>
    );
};


export default InfoPage1;