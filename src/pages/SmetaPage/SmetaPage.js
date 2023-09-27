import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './SmetaPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";


const SmetaPage = () => {
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    const navigate = useNavigate();
    const handleClick = () => navigate(-1);

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Смета', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 
            
            <div className='form-smeta'>
                <table class="unfixed-table">
                    <thead>
                            <tr>
                                <th colspan="2">Дата</th>
                                <th colspan="2">Проект</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="2">12.09.2023</td>
                                <td colspan="2">Название проекта</td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th colspan="2">Специальность</th>
                                <th colspan="2">Вид работ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="2">Техник по свету</td>
                                <td colspan="2">Монтаж</td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>Начало</th>
                                <th>Окончание</th>
                                <th>Часы</th>
                                <th>Смена</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10:00</td>
                                <td>18:00</td>
                                <td>8</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>Ставка</th>
                                <th>Переработка</th>
                                <th colspan="2">Доп. расходы</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td colspan="2">0.00</td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>Такси</th>
                                <th>ГСМ</th>
                                <th>Общ. транс</th>
                                <th>Мерч</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <td colspan="4"></td>
                            </tr>
                            <tr>
                                <td>Итого:</td>
                                <td colspan="3">0.00</td>
                            </tr>
                        </tbody>                 
                </table>       
            </div>

            <div className='block-smeta'>
                <MyButton onClick={handleClick} style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton>       
            </div>
        </div>
    );
};


export default SmetaPage;