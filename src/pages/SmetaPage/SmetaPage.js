import React, { useEffect, useState } from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import { useUsersContext } from "../../contexts/UserContext"
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import MyButton from "../../components/UI/MyButton/MyButton";
import MyModal from "../../components/MyModal/MyModal";
import './SmetaPage.css';

import Banner from "../../image/BannerWorkhub3.png";

import BlackFon from "../../image/background/Background_black_600X800.png";
import Fon from "../../image/icons/U.L.E.Y_triangle4_main2.png";
import FonGradTop from "../../image/layers/upper_red_corner_menu2.png";
import FonGradBottom from "../../image/layers/lower_blue_corner_menu.png";

import btnMenu from "../../image/layers/icon_menu.png";
import btnChange from "../../image/buttons/button_change.png";
import smallMenu from "../../image/layers/logo_04_light.png"

const SmetaPage = () => {
    const location = useLocation()
    const {tg, user} = useTelegram();
    const { specId } = useUsersContext();

    const navigate = useNavigate();
    const handleClick = () => navigate('/profile#section-two');

    const projNumber = location.state?.proj
    const projTitle = location.state?.title
    const projDate = location.state?.date != null ? location.state?.date : '';
    const projDate2 = location.state?.date2 != null ? location.state?.date2 : '';
    const projVid = location.state?.vid
    const projSpec = location.state?.spec
    const projDateMain = location.state?.dateMain

    const projStart = location.state?.start
    const projStop = location.state?.stop
    const projStavka = location.state?.stavka
    const projPererabotka = location.state?.pererabotka

    const projChasi = location.state?.chasi
    const projSmena  = location.state?.smena
    const projTaxi = location.state?.taxi
    const projGSM = location.state?.gsm  
    const projTransport = location.state?.transport  
    const projSpecialist = location.state?.specialist 

    console.log("projNumber: ", projNumber)
    console.log("projTitle: ", projTitle)
    console.log("projDate: ", projDate)
    console.log("projVid: ", projVid)
    console.log("projSpec: ", projSpec)
    console.log("projDateMain: ", projDateMain)

    console.log("specId: ", specId)
    
    const [modal, setModal] = useState(false)
    const [showGrad, setShowGrad] = useState(false)
    const [showGrad2, setShowGrad2] = useState(false)

//----------------------------------------------------------------------------------
    let d_end, year2, date2, month2, chas2, minut2;

    //time start
    const d = new Date(projDateMain);
    const year = d.getFullYear()
    const month = String(d.getMonth()+1).padStart(2, "0"); 
    const date = String(d.getDate()).padStart(2, "0"); 
    const chas = String(d.getHours()).padStart(2, "0"); //d.getHours();
    const minut = String(d.getMinutes()).padStart(2, "0"); //d.getMinutes();

    //time end
    if (projDate2) {
        d_end = new Date(projDate2);
        year2 = d_end.getFullYear()
        date2 = String(d_end.getDate()).padStart(2, "0"); 
        month2 = String(d_end.getMonth()+1).padStart(2, "0"); 
        chas2 = String(d_end.getHours()).padStart(2, "0"); //d.getHours();
        minut2 = String(d_end.getMinutes()).padStart(2, "0"); //d.getMinutes();
    } 

    const formatted = (d_end) ? `${date}.${month}.${year} - ${date2}.${month2}.${year2}` : `${date}.${month}.${year}`;

    // при первой загрузке приложения выполнится код ниже
    

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
        }, 3000)
    }


    useEffect(() => {
        tg.onEvent("backButtonClicked", handleClick)
        return () => {
            tg.offEvent('backButtonClicked', handleClick)
        }
    }, [handleClick])

    useEffect(() => {
        tg.BackButton.show();
    }, [])

    //---------------------------------------------------------------------------------------

    return (
        <div className="App">
            <Header header={{title: 'Мой доход', icon: 'false'}}/>

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            <div style={{display: 'flex', height: '100vh', position: 'fixed', right: '0', opacity: '0.6'}}>
                <img src={Fon} alt='' className='fon-style-full' />
            </div>

            <img src={FonGradTop} alt='' className='fon-style-menu1' style={{visibility: showGrad ? "visible": "hidden"}}/>
            <img src={FonGradBottom} alt='' className='fon-style-menu2' style={{visibility: showGrad2 ? "visible": "hidden"}}/>

            
            <div className='form-smeta'>

            <table className="c-tbl" id="table">
                <thead><tr>
                    <th>Дата</th><th colspan="2" className='th-inline'>{formatted}</th></tr>
                </thead>
                <tbody>
                     
                        <tr>
                            <td className='th-left'>Проект</td>
                            <td colspan="2">{projTitle}</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Специальность</td>
                            <td colspan="2">{projSpec}</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Вид работ</td>
                            <td colspan="2">{projVid}</td>
                        </tr>
                        {/* <tr>
                            <td className='th-left'>Интервал</td>
                            <td>{projStart ? projStart : "00:00"}</td>
                            <td>{projStop ? projStop : "00:00"}</td>
                        </tr> */}
                        <tr>
                            <td className='th-left'>Часы</td>
                            <td colspan="2">{projChasi ? projChasi : "0"}</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Ставка</td>
                            <td colspan="2">{projStavka ? parseInt(projStavka).toLocaleString() : "0"}.00</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Смена</td>
                            <td colspan="2">{projSmena ? parseInt(projSmena).toLocaleString() : "0"}.00</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Переработка</td>
                            <td colspan="2">{projPererabotka ? parseInt(projPererabotka).toLocaleString() : "0"}.00</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Доп. расходы</td>
                            <td colspan="2">{(projTransport + projGSM) ? (projTransport + projGSM) : "0"}.00</td>
                        </tr>
                        {/* <tr>
                            <td className='th-left'>Такси / ГСМ</td>
                            <td colspan="2">{projTaxi? parseInt(projTaxi).toLocaleString() : "0"}.00</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Общ. транспорт</td>
                            <td colspan="2">{projTransport ? projTransport : "0"}.00</td>
                        </tr>
                        <tr>
                            <td className='th-left'>Мерч</td>
                            <td colspan="2">0.00</td>
                        </tr> */}
                        <tr>
                            <td colspan="4" style={{padding: '10px'}}></td>
                        </tr>
                        <tr>
                            <td>Итого</td>
                            <td colspan="2">{projSpecialist ? parseInt(projSpecialist).toLocaleString() : "0"}.00</td>
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
                    {/* <button className="image-button2" style={{ backgroundImage: `url(${btnChange})`}}>Подтвердить смету</button>
                    <button className="image-button2" style={{ backgroundImage: `url(${btnChange})`}}>Запросить информацию по смете</button>         */}
                </div>
                    
            </div>


            <div className='block-smeta'>
                {/* <img src={btnMenu} alt='' onClick={handleClick} /> */}
                <div></div>
                <img src={smallMenu} alt='' className='small-menu-icon' />
            </div>


            <MyModal visible={modal} setVisible={setModal}>
                <p style={{position: 'absolute', width: '100%', top: '25%'}}>
                    Функция находится в разработке
                </p>
                {/* <img src={BackModal} alt=''/> */}
            </MyModal>
        </div>
    );
};


export default SmetaPage;