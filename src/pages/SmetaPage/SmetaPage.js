import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import './SmetaPage.css';
// import Fon from "../../image/logo_01_light.png";
// import FonGrad from "../../image/BlueLine1.png";
// import Banner from "../../image/BannerWorkhub.png";
// import FonTest from "../../image/back4.jpg";

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/layers/ULEY_triangle.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import TablePng from "../../image/table_with_text.png"

import btnMenu from "../../image/layers/icon_menu.png";
import btnChange from "../../image/buttons/button_change.png";
import smallMenu from "../../image/layers/ULEY text.png"

const SmetaPage = () => {
    //const location = useLocation()

    //const projNumber= location.state?.proj

    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    const navigate = useNavigate();
    const handleClick = () => navigate(-1);

    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    })

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моя смета', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'absolute', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            
            <div className='form-smeta'>

                {/* <table class="unfixed-table">
                    
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
                </table>  */}

                {/* <img style={{marginTop: '10px', position: 'relative', zIndex: '6' }} src={Banner} alt='' width='100%' /> */}


                <img src={TablePng} alt='' width='100%'/>

                <div className='block2'>
                    <MyButton style={{width: "auto", height: '40px', border: '0px', backgroundImage: `linear-gradient(#000000, #3d413e)`}}>
                        Подтвердить смету
                    </MyButton>
                    <MyButton style={{width: "auto", height: '40px', border: '0px', backgroundImage: `linear-gradient(#000000, #3d413e)`}}>
                        Запросить информацию по смете
                    </MyButton>  
                    {/* <button class="image-button2" style={{ backgroundImage: `url(${btnChange})`}}>Подтвердить смету</button>
                    <button class="image-button2" style={{ backgroundImage: `url(${btnChange})`}}>Запросить информацию по смете</button>         */}
                </div>
                    
            </div>

            {/* <div className='block-smeta'>
                <MyButton onClick={handleClick} style={{width: "80px", background: '#3f4052', border: '1px solid #3f4052'}}>Назад</MyButton>       
            </div> */}

            <div className='block-smeta' style={{position: 'absolute', right: '0', top: '650px'}}>
                <img src={btnMenu} alt='' onClick={handleClick} />
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>
        </div>
    );
};


export default SmetaPage;