import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
//import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './Page3.css';
import MyButton from "../../components/UI/MyButton/MyButton";
import MyModal from "../../components/MyModal/MyModal";

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import check2 from "../../image/check2.png";
import uncheck2 from "../../image/uncheck2.png";
import banner from "../../image/BannerWorkhub3.png";

import btnMenu from "../../image/layers/icon_menu.png";
import smallMenu from "../../image/layers/ULEY text.png"


const Page3 = () => {
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
    const [modal, setModal] = useState(false)
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        setTimeout(() =>  setShowGrad(true), 500) //градиент верх
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
    });

    {/* Закрыть */}
    const clickButton = () => {
        setModal(false)
    }

    const showPopup = () => {
        setModal(true)
    }

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моя смета', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>
            
            <div className='form-smeta-page3'>                                
                
                <div id="table-scroll" class="table-scroll">
                    <div class="table-wrap">
                        <table class="main-table" id="table">
                        <thead>
                            <tr>
                            <th class="fixed-side" scope="col" style={{minWidth: '60px', height:'45px', zIndex: '15'}}>Дата</th>
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
                                <td class="fixed-side">12.09</td>
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
                                <td class="fixed-side">13.09</td>
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
                                <td class="fixed-side">12.09</td>
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
                                <td class="fixed-side">13.09</td>
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
                                <td class="fixed-side">12.09</td>
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
                                <td class="fixed-side">13.09</td>
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
                            {/* <tr>
                                <td colSpan={10} style={{padding: '0'}}><img src={banner} alt='' width='300px'/></td>
                            </tr> */}
                        </tbody>
                        </table>
                    </div>
                    <img className='style-banner' src={banner} alt='' width='100%' />

                </div>

                
                <div className='block2'>

                    <MyButton onClick={showPopup} style={{width: "auto", height: '40px', border: '0px', backgroundImage: `linear-gradient(#000000, #3d413e)`}}>
                        Подтвердить смету
                    </MyButton>
                    <MyButton onClick={showPopup} style={{width: "auto", height: '40px', border: '0px', backgroundImage: `linear-gradient(#000000, #3d413e)`}}>
                        Запросить информацию по смете
                    </MyButton>
                    <MyButton onClick={showPopup} style={{width: "auto", height: '40px', border: '0px', backgroundImage: `linear-gradient(#000000, #3d413e)`}}>
                    Выставить счет
                    </MyButton>         
                </div>
                      
            </div>

            <div className='footer-block'>
                <Link to={'/menu'}><img src={btnMenu} alt='' /></Link>
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>

            <MyModal visible={modal} setVisible={setModal}>
                <h3>Функция находится в разработке</h3>
                <br/>
                <MyButton style={{width: '200px', background: '#141414', border: '#141414'}} onClick={clickButton}>ЖДУ С НЕТЕРПЕНИЕМ</MyButton>
            </MyModal>

        </div>
    );
};


export default Page3;