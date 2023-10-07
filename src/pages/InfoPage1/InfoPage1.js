import React, { useState, useEffect, useCallback } from 'react';
import {Link} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './InfoPage1.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/BlueLine1.png";
import MyButton from "../../components/UI/MyButton/MyButton";


const API_URL = process.env.REACT_APP_API_URL

const InfoPage1 = () => {
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'С чего начать', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 
            
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
                <div className='block-buttons-info1'>
                    <Link to={'/info'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton></Link>
                </div>
            </form>         
        </div>
    );
};


export default InfoPage1;