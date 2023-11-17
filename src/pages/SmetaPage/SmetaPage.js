import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import MyModal from "../../components/MyModal/MyModal";
import './SmetaPage.css';

import Banner from "../../image/BannerWorkhub3.png";

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import TablePng from "../../image/table_with_text.png"

import btnMenu from "../../image/layers/icon_menu.png";
import btnChange from "../../image/buttons/button_change.png";
import smallMenu from "../../image/layers/ULEY text.png"
import BackModal from "../../image/background/background_modal.png"

const SmetaPage = () => {
    //const location = useLocation()

    //const projNumber= location.state?.proj
    
    const [modal, setModal] = useState(false)
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {

    }, []);

    const navigate = useNavigate();
    const handleClick = () => navigate(-1);

    useEffect(() => {
        setTimeout(() =>  setShowGrad2(true), 500) // градиент низ
        setTimeout(() =>  setShowGrad(true), 4500) //градиент верх  
    })

    {/* Закрыть */}
    const clickButton = () => {
        setModal(false)

    }

    const showPopup = () => {
        setModal(true)
        setTimeout(()=> {
            setModal(false)
        }, 1300)
    }

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Моя смета', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0', opacity: '0.6'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            
            <div className='form-smeta'>

            <table class="c-tbl" id="table">
                <thead><tr>
                    <th>Дата</th><th colspan="2" className='th-inline'>31.12.2023</th></tr>
                </thead>
                <tbody>
                     
                        <tr>
                            <td className='th-left'>Проект</td>
                            <td colspan="2">Название проекта</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Специальность</td>
                            <td colspan="2">---</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Вид работ</td>
                            <td colspan="2">---</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Интервал</td>
                            <td>00:00</td>
                            <td>00:00</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Часы</td>
                            <td colspan="2">0</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Смена</td>
                            <td colspan="2">0</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Ставка</td>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Переработка</td>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Доп. расходы</td>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Такси / ГСМ</td>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Общ. транспорт</td>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Мерч</td>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <td colspan="4" style={{padding: '10px'}}></td>
                        </tr>
                        <tr>
                            <td>Итого</td>
                            <td colspan="2">0.00</td>
                        </tr>
                        <tr>
                            <td colspan="3" style={{padding: '0 3px'}}><img src={Banner} alt='' width='100%'/></td>
                        </tr>
                </tbody>
            </table>

               

                {/* <img style={{marginTop: '10px', position: 'relative', zIndex: '6' }} src={Banner} alt='' width='100%' /> */}


                {/* <img src={TablePng} alt='' width='100%'/> */}

                <div className='block2'>
                    <MyButton onClick={showPopup} style={{width: "auto", height: '40px', border: '0px', backgroundImage: `linear-gradient(#000000, #3d413e)`}}>
                        Подтвердить смету
                    </MyButton>
                    <MyButton onClick={showPopup} style={{width: "auto", height: '40px', border: '0px', backgroundImage: `linear-gradient(#000000, #3d413e)`}}>
                        Запросить информацию по смете
                    </MyButton>  
                    {/* <button class="image-button2" style={{ backgroundImage: `url(${btnChange})`}}>Подтвердить смету</button>
                    <button class="image-button2" style={{ backgroundImage: `url(${btnChange})`}}>Запросить информацию по смете</button>         */}
                </div>
                    
            </div>


            <div className='block-smeta'>
                <img src={btnMenu} alt='' onClick={handleClick} />
                <img src={smallMenu} alt='' style={{position: 'relative', marginRight: '5px', width: '120px'}} />
            </div>


            <MyModal visible={modal} setVisible={setModal}>
                <p style={{position: 'absolute', width: '100%', top: '25%'}}>
                    Функция находится в разработке
                </p>
                <img src={BackModal} alt=''/>
            </MyModal>
        </div>
    );
};


export default SmetaPage;