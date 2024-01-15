import React, {useState, useEffect, useRef} from 'react';
import './ProjectItem.css';
import {useNavigate} from "react-router-dom";
import Loader from "./../UI/Loader_min/Loader_min"
import Slider from '@mui/material/Slider';

import MyModal from "../../components/MyModal/MyModal";
import BackModal from "../../image/new/card.svg"

import { useUsersContext } from "../../contexts/UserContext";
import { getStavka, addStavka, addFactStavka, getSpecStavka } from '../../http/stavkaAPI';

import btnChat from "../../image/new/btn_chat.svg"
import Vector from "../../image/new/vector.svg"
import VectorUp from "../../image/new/vector_up.svg"
import Ukazatel from "../../image/new/ukazatel.png"
import Close from "../../image/new/close.svg"
import ClosePress from "../../image/new/close_press.svg"
// import Shkala from "../../image/new/shkala2.svg"

import begunok from "../../image/new/begunok.png"
import Shkala1 from "../../image/new/progress.png"
import Shkala2 from "../../image/new/progress2.png"
import Shkala3 from "../../image/new/progress3.png"
import Shkala4 from "../../image/new/progress4.png"
import Shkala5 from "../../image/new/progress5.png"
import RangeSlider from '../UI/RangeSlider/RangeSlider';

const ProjectItem = (props) => {

    const {specId, stavkaPlus} = useUsersContext();

    const [statusMoney, setStatusMoney] = useState("")
    const [stavka, setStavka] = useState()
    const [cashStavka, setCashStavka] = useState({})

    const [isLoading, setIsLoading] = useState(true);

    const [showProject, setShowProject] = useState(false);
    const [showModalEtap, setShowModalEtap] = useState(false);
    const [widthCard, setWidthCard] = useState(0);
    
    const [showShkala1, setShowShkala1] = useState(false);
    const [showShkala2, setShowShkala2] = useState(false);
    const [showShkala3, setShowShkala3] = useState(false);
    const [showShkala4, setShowShkala4] = useState(false);
    const [showShkala5, setShowShkala5] = useState(false);

    const [valueShkala, setValueShkala] = useState(0);

    const [formatted, setFormatted] = useState("")
    const [formattime, setFormattime] = useState("")
    const [fact, setFact] = useState()

    const [mainDate, setMainDate] = useState("")

    const [showInfo, setShowInfo] = useState(false)

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const sliderRef = useRef(null)

    const [inputValue, setInputValue] = useState(50)

    useEffect(()=> {
 
        const dateTemp = props.post.specs.date

        const fact = props.post.smeta ? props.post.smeta.filter((item) => item.fio_id === specId && item.date === dateTemp)[0]?.specialist : ""
        setFact(fact)
        //console.log("fact: ", fact)
    
        let d_end, year2, date2, month2, chas2, minut2;
    
        const d = new Date(dateTemp);
    
        //time start
        const year = d.getFullYear()
        const month = String(d.getMonth()+1).padStart(2, "0"); 
        const date = String(d.getDate()).padStart(2, "0"); 
        const chas = String(d.getHours()).padStart(2, "0"); //d.getHours();
        const minut = String(d.getMinutes()).padStart(2, "0"); //d.getMinutes();
    
        const formatted = (d_end) ? `${date}.${month}.${year} - ${date2}.${month2}.${year2}` : `${date}.${month}.${year}`;
        const formattime = `${chas}:${minut}`
        setFormatted(formatted)
        setFormattime(formattime)
    })

    useEffect(()=> {
        //сохранить в бд фактическую ставку
        const saveFact = async() => {
            if (fact) {
                const res = await addFactStavka(specId, props.post.id, fact, props.post.specs.date)

                setCashStavka(res) 
            }
        }

        saveFact()
    }, [fact])
    
    useEffect(()=> {
        const fetch = async() => {
            const res0 = await getSpecStavka(specId, props.post.id, props.post.specs.date)

            //если кэш пуст
            if (!res0) {
                const res = await getStavka(props.post.id, props.post.specs.rowId) //API
                //console.log(res)

                //сохранить в бд предварительную ставку
                const res_add = await addStavka(specId, props.post.id, res ? res.payment : 0, props.post.specs.date) 
                console.log("pred stavka cash: ", res_add)

                const res2 = await getSpecStavka(specId, props.post.id, props.post.specs.date)
                setCashStavka(res2) 

                if (res2.factStavka) { 
                    if (res2.podtverStavka) {
                        setStavka(res2.podtverStavka)
                    } else {
                        setStavka(res2.factStavka)
                    }
                } else {
                    setStavka(res2.predStavka)
                }

                setIsLoading(false)
                    
            } else {                
                setCashStavka(res0) // данные из кэша
 
                if (res0.factStavka) { 
                    if (res0.podtverStavka) {
                        setStavka(res0.podtverStavka)
                    } else {
                        setStavka(res0.factStavka)
                    }
                } else {
                    setStavka(res0.predStavka)
                }

                setIsLoading(false)
            }      
        }

        fetch()
    }, [])
    


    useEffect(()=> {
          
        if (props.post.statusMoney === 1) {
            setStatusMoney('Предварительно')

            setShowShkala1(true)

            setValueShkala(13)

        } else if(props.post.statusMoney === 2) {
            setStatusMoney('Фактически')

            setShowShkala1(false)
            setShowShkala2(true)

            setValueShkala(30)
        }

        if (props.post.finalSmeta === 'Подтверждена') {
            setStatusMoney('Подтверждено')
            
            setShowShkala1(false)
            setShowShkala2(false)
            setShowShkala3(true)

            setValueShkala(50)
        }
        // else if(props.post.statusMoney === 4) {
        //     setStatusMoney('На оплате')
        // }
        // else if(props.post.statusMoney === 5) {
        //     setStatusMoney('Оплачено')
        // }
    }, [])
    
    const goToChat = (e) => {
        e.stopPropagation();
        window.location.replace(props.post.tgURL_chat);
      };

    const clickProject = () => {
        showProject ? setShowProject(false) : setShowProject(true)
    }

    const clickShkala = () => {
        showModalEtap ? setShowModalEtap(false) : setShowModalEtap(true)
    }

    const clickInfo = () => {
        showInfo ? setShowInfo(false) : setShowInfo(true)
    }


    function handleTouchStart(e) {
        setTouchStart(e.targetTouches[0].clientX);
        console.log("start")
        
    }
    
    function handleTouchMove(e) {
        setTouchEnd(e.targetTouches[0].clientX); 
        console.log("move")    
    }

    return (
    <>
        <div className='container'>
            
            <div className='proj-card'>
                <div className='rectangle-projcard'></div>
                <div className='rectangle-projcard2'></div>
                <div className='rectangle-projcard3'></div>
                
                <div className='project-text'>
                    <p className="project_title" onClick={clickProject}>{props.post.title}</p>
                    <p className="project_subtitle">{formatted} | {formattime}</p>
                </div>

                <img onClick={clickProject} className='vector' src={showProject ? VectorUp : Vector} alt=''/>   
                
                {/* <div className='shkala-click' onClick={clickShkala} onTouchMove={handleTouchStart}></div> */}
                
                {/* <div className='shkala1'>
                   <img src={Shkala1} alt='' className='shkala-img' style={{display: showShkala1 ? 'block' : 'none'}}/> 
                   <img src={Shkala2} alt='' className='shkala-img' style={{display: showShkala2 ? 'block' : 'none'}}/> 
                   <img src={Shkala3} alt='' className='shkala-img' style={{display: showShkala3 ? 'block' : 'none'}}/> 
                   <img src={Shkala4} alt='' className='shkala-img' style={{display: showShkala4 ? 'block' : 'none'}}/> 
                   <img src={Shkala5} alt='' className='shkala-img' style={{display: showShkala5 ? 'block' : 'none'}}/> 
                </div> */}


                <RangeSlider min={0} max={1000} value={valueShkala} step={50} />
                

                <div className='card-footer'>
                    {/* деньги */}
                    <p className='project_money'>{isLoading ? <Loader /> : (stavka ? parseInt(stavkaPlus ? stavkaPlus : stavka).toLocaleString()+".00" : '0')}</p>
                    {/* <p className='project_money'>{parseInt(stavkaPlus).toLocaleString()+".00"}</p> */}
                    {/* кнопка Чат */}
                    {props.post.tgURL_chat && <div onClick={goToChat} className='chat-button' style={{backgroundImage: `url(${btnChat})`}}>Чат</div>}
                </div>

                

                <div className='smeta' style={{display: showProject ? 'block' : 'none'}}>
                    <div className='line3'></div>
                    <div className='smeta-text'>
                        <ul>
                            <li className='item-list'><div>Специальность</div>{props.post.specs.spec}</li>
                            <li className='item-list'><div>Вид работ</div>{props.post.specs.vid}</li>
                            <li className='item-list'><div>Часы</div>{props.post.smeta ? props.post.smeta.filter((item) => item.fio_id === specId && item.date === props.post.specs.date)[0]?.chasi : ''}</li>
                            <li className='item-list'><div>Ставка</div>{props.post.smeta ? parseInt(props.post.smeta.filter((item) => item.fio_id === specId && item.date === props.post.specs.date)[0]?.stavka).toLocaleString()+".00" : ''}</li>
                            <li className='item-list'><div>Смена</div>{props.post.smeta ? parseInt(props.post.smeta.filter((item) => item.fio_id === specId && item.date === props.post.specs.date)[0]?.smena).toLocaleString()+".00" : ''}</li>
                            <li className='item-list'><div>Переработка</div>{props.post.smeta ? parseInt(props.post.smeta.filter((item) => item.fio_id === specId && item.date === props.post.specs.date)[0]?.pererabotka).toLocaleString()+".00" : ''}</li>
                            <li className='item-list'><div>Доп. расходы</div></li>
                        </ul>
                    </div>
                    <div className='block-button'>
                        <div className='button1' onClick={clickInfo}>Уточнить</div>
                        <div className='button2' onClick={clickInfo}>Подтвердить</div>
                    </div>
                </div> 
            </div> 
        </div>

        <MyModal visible={showModalEtap} setVisible={setShowModalEtap}>
            <div className='modal-card'>
                <div className='rectangle-modal'></div>
                <div className='rectangle-modal2'></div>
                <div className='rectangle-modal3'></div>

                {/* <img src={Question} alt='' style={{position: 'absolute', top: '20px', left: '20px'}}/> */}
                <div className='block-close' onClick={()=>setShowModalEtap(false)}>
                   <img src={Close} alt=''/> 
                </div>

                <p style={{position: 'absolute', width: '100%', top: '45px'}}>
                    Этапы передвижения ваших средств
                </p>

                <div className='block-text'>
                    <ul className='text-modal-list'>
                        <li>01. Предварительно</li>
                        <li>02. Фактически</li>
                        <li>03. Подтверждено</li>
                        <li>04. В процессе [на оплате]</li>
                        <li>05. Оплачено</li>
                    </ul>
                </div>
            </div>
            {/* <img src={BackModal} alt=''/> */}
        </MyModal>

        <MyModal visible={showInfo} setVisible={setShowInfo}>
                <div className='info-card'>
                    <div className='rectangle-modal'></div>
                    <div className='rectangle-modal2'></div>
                    <div className='rectangle-modal3'></div>

                    <p className='vagno'>Важно</p>
                    <p className='text-vagno'>Функция находится в разработке</p>
                    <div className='button-ok' onClick={()=>setShowInfo(false)}>
                        <div className='rec-button'>Хорошо</div>
                        
                    </div>
                </div>
        </MyModal>
    </>
    );
};

export default ProjectItem;