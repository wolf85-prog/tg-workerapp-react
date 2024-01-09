import React, { useState, useEffect, useCallback } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Header from "../../components/Header/Header";
import './AnketaPage.css';
import MyModal from "../../components/MyModal/MyModal";

import {getWorkerId} from "../../http/chatAPI"

import BlackFon from "../../image/new/fon_grad.svg";

import btnApplyCancel from "../../image/newpassport/button_apply.png"
import btnInfo from "../../image/newpassport/button_info.png"

import MyButton from "../../components/UI/MyButton/MyButton";


const AnketaPage = () => {
    const {tg, user} = useTelegram();
    const navigate = useNavigate();

    const [headerName, setHeaderName] = useState('Моя аккредитация');
    const [showPage1, setShowPage1] = useState(true)
    const [showPage2, setShowPage2] = useState(false)
    const [showPage3, setShowPage3] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const [workerName, setWorkerName] = useState("")
//----------------------------------------------------------------------------------

    // при первой загрузке приложения выполнится код ниже
    useEffect(() => {
        
        const fetch = async() => {
           const worker = await getWorkerId(user?.id) //user?.id '1408579113'
            console.log(worker[0]?.fio.split(' ')[1])
            setWorkerName(worker[0]?.fio.split(' ')[1]) 
        }
        
        fetch()      
    })


    const clickOtkaz = () => {
        setShowModal(true)
    }

    const clickApply = () => {
        navigate('/add-passport')
    }

    //---------------------------------------------------------------------------------------

    const onClose = () => {
        tg.close()
    }

    useEffect(()=>{
        tg.setHeaderColor('#343A41') // установка цвета хедера
        tg.setBackgroundColor('#343A41') // установка цвета бэкграунда
        
        if (!tg.isExpanded) {
           tg.expand() //раскрыть приложение на всю высоту 
        }
        
    }, [])

    useEffect(() => {
        tg.onEvent("backButtonClicked", onClose)
        return () => {
            tg.offEvent('backButtonClicked', onClose)
        }
    }, [onClose])

    useEffect(() => {
        tg.BackButton.show();
    }, [])

    return (
        <div className="App">
            {/* <Header header={{title: '', icon: 'false'}}/> */}
            {/* <Header header={{title: `${headerName}`, icon: 'false'}}/> */}

            {/* темный фон */}
            <img src={BlackFon} alt='' className='fon-black' />
            
            {/*аккредитация*/}   
            <p className='header-passport'>
                Моя аккредитация
            </p>

            <div className="container" style={{margin: '115px 25px'}}>
                {/* ФИО */}
                <article className="card" style={{position: 'absolute', top: '75px', height: '300px'}}>
                    <div className="rectangle"><div className="rectangle2"><div className="rectangle3"></div></div></div>
                    <div style={{
                            position: 'relative',
                            margin: '20px 25px',
                            display: 'flex',
                            flexDirection: 'column',
                            fontStyle: 'normal',
                            fontWeight: '500',
                            fontSize: '16px',
                            lineHeight: '20px',
                            letterSpacing: '-0.045em',
                            /* ULEY Светлый */
                            color: '#E8F1F9',
                            textAlign: 'left',
                        }}>
                        <p> Добрый день, {workerName}.</p> 
                        <p>На связи система U.L.E.Y | Workhub.</p> 
 
                    </div> 
                    <div style={{
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '14px',
                        lineHeight: '17px',
                        /* identical to box height */
                        letterSpacing: '-0.045em',
                        /* ULEY Светлый */
                        color: '#E8F1F9',
                        opacity: '0.4',
                        padding: '5px 25px',
                        textAlign: 'left',
                    }}>
                        <p>
                            Служба безопасности требует предоставить информацию о специалистах приглашённых на проект, в этом случае участие возможно только после предоставления персональных данных.
                        </p>
                        <br/>
                        <p>
                            Для продолжения необходимо  согласие
                        </p>
                    </div> 

                    <div className='block-button'>
                        <div className='button1' onClick={clickOtkaz}>Отказываюсь</div>
                        <div className='button2' onClick={clickApply}>Согласен</div>
                    </div>   
                </article>
            </div>

            <MyModal visible={showModal} setVisible={setShowModal}>
                <div className='info-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'>Ваш отказ принят</p>
                    <div className='text-vagno' style={{textAlign: 'left'}}>
                        <p>Для продолжения работы на этом проекте необходимо  согласие.</p>
                        <p>До встречи на других проектах!</p>
                    </div>
                    <div className='button-ok' onClick={()=>setShowModal(false)}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
            </MyModal>
            
            {/* <div style={{display: 'flex', height: '100vh'}}>
                <div style={{display: showPage1 ? "block" : 'none', position: 'relative', zIndex: '10', height: '285px', margin: 'auto'}}>                  
                    <div style={{
                            margin: '20px 25px',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            fontSize: '18px',
                            color: '#fff',
                        }}>
                        <p> Добрый день, {workerName}.</p> 
                        <p>На связи система U.L.E.Y | Workhub.</p>
                    </div>

                    <div>
                        <button onClick={pagePassport} className="image-button-anketa" style={{ backgroundImage: `url(${btnApplyCancel})`}}>Согласен предоставить персональные данные</button>
                        <button onClick={page3} className="image-button-anketa" style={{ backgroundImage: `url(${btnApplyCancel})`}}>Отказываюсь от предоставления данных и участия в проекте</button>
                        <button onClick={page2} className="image-button-anketa" style={{ backgroundImage: `url(${btnApplyCancel})`}}>Пояснения</button>
                    </div>       
                </div>

                 <div style={{display: showPage3 ? "block" : 'none', position: 'relative', zIndex: '10', height: '60px', margin: 'auto'}}>                  
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '0px 25px'}}> 
                        <p
                            style={{
                                fontSize: '20px',
                                color: '#fff',
                            }}> Ваш отказ принят. 
                        </p>  
                        <p style={{
                                fontSize: '20px',
                                color: '#fff',
                            }}>До встречи на следующем проекте!
                        </p>  
                    </div>  
                </div>

                 <div style={{display: showPage2 ? "block" : 'none', position: 'relative', zIndex: '10', height: '320px', margin: 'auto'}}>                  
                    <div
                        style={{
                            margin: '20px 25px',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            fontSize: '18px',
                            color: '#fff',
                        }}> 
                        <p>Служба безопасности </p>
                        <p>требует предоставить информацию о специалистах приглашенных на проект, в этом случае участие возможно только после предоставления персональных данных.</p>
                    </div> 

                    <div>
                        <button onClick={pagePassport} className="image-button-anketa" style={{ backgroundImage: `url(${btnApplyCancel})`}}>Согласен предоставить персональные данные</button>
                        <button onClick={page3} className="image-button-anketa" style={{ backgroundImage: `url(${btnApplyCancel})`}}>Отказываюсь от предоставления данных и участия в проекте</button>
                    </div>      
                </div>
            </div>    */}
    
        </div>
    );
};


export default AnketaPage;