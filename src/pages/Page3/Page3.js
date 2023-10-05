import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
//import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './Page3.css';
import MyButton from "../../components/UI/MyButton/MyButton";
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/BlueLine1.png";
import check2 from "../../image/check2.png";
import uncheck2 from "../../image/uncheck2.png";

//const API_URL = process.env.REACT_APP_API_URL

const Page3 = () => {
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моя смета', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 
            
            <div className='form-smeta'>
                                 
                    {/* <p
                        style={{
                            margin: '20px 5px',
                            display: 'flex',
                            fontSize: '26px',
                            color: '#2975f5',
                        }}> Страница "Сметы" находится в разработке!
                    </p>          */}

                {/* <table>
                <caption>Страница "Сметы" находится в разработке!</caption>
                <thead>
                    <tr>
                        <th scope="col">Дата</th>
                        <th scope="col">Название проекта</th>
                        <th scope="col">Специальность</th>
                        <th scope="col">Кол-во часов</th>
                        <th scope="col">Сумма за проект</th>
                        <th scope="col">Дополнительные расходы</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="Дата">04/01/2016</td>
                        <td data-label="Название проекта">04/01/2016</td>
                        <td data-label="Специальность">1,190</td>
                        <td data-label="Кол-во часов">12</td>
                        <td data-label="Сумма за проект">1,190</td>
                        <td data-label="Дополнительные расходы">1,190</td>
                    </tr>
                    <tr>
                        <td scope="row" data-label="Дата">04/01/2016</td>
                        <td data-label="Название проекта">04/01/2016</td>
                        <td data-label="Специальность">1,190</td>
                        <td data-label="Кол-во часов">34</td>
                        <td data-label="Сумма за проект">1,190</td>
                        <td data-label="Дополнительные расходы">1,190</td>
                    </tr>
                    <tr>
                        <td scope="row" data-label="Дата">04/01/2016</td>
                        <td data-label="Название проекта">04/01/2016</td>
                        <td data-label="Специальность">1,190</td>
                        <td data-label="Кол-во часов">45</td>
                        <td data-label="Сумма за проект">1,190</td>
                        <td data-label="Дополнительные расходы">1,190</td>
                    </tr>
                    <tr>
                        <td scope="row" data-label="Дата">04/01/2016</td>
                        <td data-label="Название проекта">04/01/2016</td>
                        <td data-label="Специальность">1,190</td>
                        <td data-label="Кол-во часов">56</td>
                        <td data-label="Сумма за проект">1,190</td>
                        <td data-label="Дополнительные расходы">1,190</td>
                    </tr>
                </tbody>
                </table> */}

                <div class="table1-container">
                    
                    <div class="table-horizontal-container">
                        <table class="smeta-all-table">
                        <thead>
                            <tr>
                                <th style={{minWidth: '50px', background: '#000', height:'45px', zIndex: '15'}}>Дата</th>
                                <th style={{minWidth: '200px'}}>Проект</th>
                                <th style={{minWidth: '150px'}}>Вид работ</th>
                                <th style={{minWidth: '50px'}}>Старт</th>
                                <th style={{minWidth: '50px'}}>Стоп</th>
                                <th style={{minWidth: '100px'}}>Ставка</th>
                                <th style={{minWidth: '100px'}}>Переработка</th>
                                <th style={{minWidth: '120px'}}>Доп. расходы</th>
                                <th style={{minWidth: '100px'}}>Итого</th>
                                <th style={{minWidth: '5px'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th style={{background: '#000'}}>12.09</th>
                                <td>Проект 1</td>
                                <td>Монтаж</td>
                                <td>23:00</td>
                                <td>01:00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td><img src={check2} width='25' style={{verticalAlign: 'middle', padding: '3px'}} alt=''/></td>
                            </tr>
                            <tr>
                                <th style={{background: '#000'}}>13.09</th>
                                <td>Проект 2</td>
                                <td>Монтаж</td>
                                <td>23:00</td>
                                <td>01:00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td><img src={uncheck2} width='25' style={{verticalAlign: 'middle', padding: '3px'}} alt=''/></td>
                            </tr>
                            <tr>
                                <th style={{background: '#000'}}>12.09</th>
                                <td>Проект 1</td>
                                <td>Монтаж</td>
                                <td>23:00</td>
                                <td>01:00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th style={{background: '#000'}}>13.09</th>
                                <td>Проект 2</td>
                                <td>Монтаж</td>
                                <td>23:00</td>
                                <td>01:00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th style={{background: '#000'}}>12.09</th>
                                <td>Проект 1</td>
                                <td>Монтаж</td>
                                <td>23:00</td>
                                <td>01:00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th style={{background: '#000'}}>13.09</th>
                                <td>Проект 2</td>
                                <td>Монтаж</td>
                                <td>23:00</td>
                                <td>01:00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td>10 000,00</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th colSpan={8}></th>
                                {/* <td>Сумма:</td> */}
                                <td>60 000,00</td>
                                <td></td>
                            </tr>
                        </tbody>
                    
                        </table>
                    </div>
                </div>

                <div className='block2'>
                    <MyButton style={{width: "auto", background: '#3f4052', border: '1px solid #3f4052'}}>
                        Подтвердить смету
                    </MyButton>
                    <MyButton style={{width: "auto", background: '#3f4052', border: '1px solid #3f4052'}}>
                        Запросить информацию по смете
                    </MyButton>  
                    <MyButton style={{width: "auto", background: '#3f4052', border: '1px solid #3f4052'}}>
                        Выставить счет
                    </MyButton>        
                </div>
                      
            </div>

            <div className='block-buttons'>
                <Link to={'/menu'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>
            </div>
        </div>
    );
};


export default Page3;