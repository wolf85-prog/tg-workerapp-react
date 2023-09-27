import React, { useEffect } from 'react';
import {Link} from "react-router-dom";
//import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './Page3.css';
import MyButton from "../../components/UI/MyButton/MyButton";
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/gradient2.png";


//const API_URL = process.env.REACT_APP_API_URL

const Page3 = () => {
    
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Смета', icon: 'false'}}/>

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

                <div class="table-container">
                    
                    <div class="table-horizontal-container">
                        <table class="unfixed-table">
                        <thead>
                            <tr>
                                <th>Дата</th>
                                <th>Название проекта</th>
                                <th>Статус</th>
                                <th>Часы</th>
                                <th>Смета</th>
                                <th>Итого</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>12.09</th>
                                <td>Проект 1</td>
                                <td>Монтаж</td>
                                <td>23:00 - 01:00</td>
                                <td>5 000,00</td>
                                <td>5 000,00</td>
                            </tr>
                            <tr>
                                <th>13.09</th>
                                <td>Проект 2</td>
                                <td>Монтаж</td>
                                <td>23:00 - 01:00</td>
                                <td>5 000,00</td>
                                <td>5 000,00</td>
                            </tr>
                            <tr>
                                <th>12.09</th>
                                <td>Проект 1</td>
                                <td>Монтаж</td>
                                <td>23:00 - 01:00</td>
                                <td>5 000,00</td>
                                <td>5 000,00</td>
                            </tr>
                            <tr>
                                <th>13.09</th>
                                <td>Проект 2</td>
                                <td>Монтаж</td>
                                <td>23:00 - 01:00</td>
                                <td>5 000,00</td>
                                <td>5 000,00</td>
                            </tr>
                            <tr>
                                <th>12.09</th>
                                <td>Проект 1</td>
                                <td>Монтаж</td>
                                <td>23:00 - 01:00</td>
                                <td>5 000,00</td>
                                <td>5 000,00</td>
                            </tr>
                            <tr>
                                <th>13.09</th>
                                <td>Проект 2</td>
                                <td>Монтаж</td>
                                <td>23:00 - 01:00</td>
                                <td>5 000,00</td>
                                <td>5 000,00</td>
                            </tr>
                        </tbody>
                    
                        </table>
                    </div>
                </div>

                      
            </div>

            <div className='block-buttons'>
                <Link to={'/menu'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>
            </div>
        </div>
    );
};


export default Page3;