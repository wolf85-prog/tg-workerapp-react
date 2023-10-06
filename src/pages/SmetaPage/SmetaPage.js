import React, { useEffect } from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './SmetaPage.css';
import Fon from "../../image/logo_01_light.png";
import FonGrad from "../../image/BlueLine1.png";


const SmetaPage = () => {
    const location = useLocation()

    const projNumber= location.state?.proj
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    const navigate = useNavigate();
    const handleClick = () => navigate(-1);

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моя смета', icon: 'false'}}/>

            <img src={Fon} alt='' className='fon-style'/>
            <img src={FonGrad} alt='' className='fon-style2'/> 
            
            <div className='form-smeta'>

                <table class="unfixed-table">
                    
                    <thead>
                        <tr>    
                            <th style={{textAlign: 'left', width: '135px'}}>Дата</th>
                            <td colspan="2">31.12.2023</td>
                        </tr>  
                        
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Проект</th>
                            <td colspan="2">Название проекта</td>
                        </tr>
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Специальность</th>
                            <td colspan="2">Оператор световой пушки</td>
                        </tr>
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Вид работ</th>
                            <td colspan="2">Монтаж</td>
                        </tr>
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Интервал</th>
                            <td>12:00</td>
                            <td>18:00</td>
                        </tr>
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Часы</th>
                            <td colspan="2">6</td>
                        </tr>
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Смена</th>
                            <td colspan="2">10</td>
                        </tr>
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Ставка</th>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Переработка</th>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Доп. расходы</th>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Такси / ГСМ</th>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Общ. транспорт</th>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <th style={{textAlign: 'left', width: '135px'}}>Мерч</th>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <td colspan="4" style={{padding: '10px'}}></td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'left', width: '135px'}}>Итого</td>
                            <td colspan="2">0.00</td>
                        </tr>
                    </thead>
                </table> 
                {/* } */}
                <div className='block2'>
                    <MyButton style={{width: "auto", background: '#3f4052', border: '1px solid #3f4052'}}>
                        Подтвердить смету
                    </MyButton>
                    <MyButton style={{width: "auto", background: '#3f4052', border: '1px solid #3f4052'}}>
                        Запросить информацию по смете
                    </MyButton>          
                </div>
                    
            </div>

            <div className='block-smeta'>
                <MyButton onClick={handleClick} style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton>       
            </div>
        </div>
    );
};


export default SmetaPage;