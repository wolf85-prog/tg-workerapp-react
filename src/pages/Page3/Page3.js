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
            
            <div className='form-smeta-page3'>
                                 
            <div id="table-scroll" class="table-scroll">
                <div class="table-wrap">
                    <table class="main-table">
                    <thead>
                        <tr>
                        <th class="fixed-side" scope="col" style={{minWidth: '60px', background: '#000', height:'45px', zIndex: '15'}}>Дата</th>
                            <th scope="col" style={{minWidth: '200px'}}>Проект</th>
                            <th scope="col" style={{minWidth: '150px'}}>Вид работ</th>
                            <th scope="col" style={{minWidth: '60px'}}>Старт</th>
                            <th scope="col" style={{minWidth: '60px'}}>Стоп</th>
                            <th scope="col" style={{minWidth: '100px'}}>Ставка</th>
                            <th scope="col" style={{minWidth: '100px'}}>Переработка</th>
                            <th scope="col" style={{minWidth: '120px'}}>Доп. расходы</th>
                            <th scope="col" style={{minWidth: '100px'}}>Итого</th>
                            <th scope="col" style={{padding: 0}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th class="fixed-side">12.09</th>
                            <td>Проект 1</td>
                            <td>Монтаж</td>
                            <td>23:00</td>
                            <td>01:00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td style={{padding: '4px'}}><img src={check2} width='25' style={{verticalAlign: 'middle', padding: '3px'}} alt=''/></td>
                        </tr>
                        <tr>
                            <th class="fixed-side">13.09</th>
                            <td>Проект 1</td>
                            <td>Монтаж</td>
                            <td>23:00</td>
                            <td>01:00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td style={{padding: '4px'}}><img src={uncheck2} width='25' style={{verticalAlign: 'middle', padding: '3px'}} alt=''/></td>
                        </tr>
                        <tr>
                            <th class="fixed-side">12.09</th>
                            <td>Проект 1</td>
                            <td>Монтаж</td>
                            <td>23:00</td>
                            <td>01:00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td style={{padding: 0}}></td>
                        </tr>
                        <tr>
                            <th class="fixed-side">13.09</th>
                            <td>Проект 1</td>
                            <td>Монтаж</td>
                            <td>23:00</td>
                            <td>01:00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td style={{padding: 0}}></td>
                        </tr>
                        <tr>
                            <th class="fixed-side">12.09</th>
                            <td>Проект 1</td>
                            <td>Монтаж</td>
                            <td>23:00</td>
                            <td>01:00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td style={{padding: 0}}></td>
                        </tr>
                        <tr>
                            <th class="fixed-side">13.09</th>
                            <td>Проект 1</td>
                            <td>Монтаж</td>
                            <td>23:00</td>
                            <td>01:00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td>10 000,00</td>
                            <td style={{padding: 0}}></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan={7}></td>
                            {/* <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td> */}
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

            <div className='block-buttons-page3'>
                <Link to={'/menu'}><MyButton style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Меню</MyButton></Link>
            </div>
        </div>
    );
};


export default Page3;