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

import RangeSlider from '../UI/RangeSlider/RangeSlider';

const ProjectItem = (props) => {

    const {specId} = useUsersContext();

    const [statusMoney, setStatusMoney] = useState("")
    const [stavka, setStavka] = useState()
    const [cashStavka, setCashStavka] = useState({})

    const [isLoading, setIsLoading] = useState(true);

    const [showProject, setShowProject] = useState(false);
    const [showModalEtap, setShowModalEtap] = useState(false);
    const [widthCard, setWidthCard] = useState(0);
    

    const [valueShkala, setValueShkala] = useState(0);

    const [formatted, setFormatted] = useState("")
    const [formattime, setFormattime] = useState("")
    const [fact, setFact] = useState()

    const [showInfo, setShowInfo] = useState(false)

    const [stavkaPlus, setStavkaPlus] = useState(0);

    const sliderRef = useRef(null)

    let statusMoney2 = 2

    const [chasiView, setChasiView] = useState(0);
    const [smenaView, setSmenaView] = useState(0);
    const [stavkaView, setStavkaView] = useState(0);
    const [pererabotkaView, setPererabotkaView] = useState(0);

    useEffect(()=> {
        console.log("props: ", props.post.smeta, specId)

        setChasiView(props.post.smeta ? props.post.smeta.find((item) => item.fio_id === specId && new Date(item.date).getTime() > new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() - 1) && new Date(item.date).getTime() < new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() + 1) )?.chasi : '')
        setStavkaView(props.post.smeta ? props.post.smeta.find((item) => item.fio_id === specId && new Date(item.date).getTime() > new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() - 1) && new Date(item.date).getTime() < new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() + 1) )?.stavka : '...')
        setSmenaView(props.post.smeta ? props.post.smeta.find((item) => item.fio_id === specId && new Date(item.date).getTime() > new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() - 1) && new Date(item.date).getTime() < new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() + 1) )?.smena : '...')
        setPererabotkaView(props.post.smeta ? props.post.smeta.find((item) => item.fio_id === specId && new Date(item.date).getTime() > new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() - 1) && new Date(item.date).getTime() < new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() + 1) )?.pererabotka : '...')
        

        // console.log("setChasiView: ", props.post.smeta ? props.post.smeta.find((item) => item.fio_id === specId && new Date(item.date).getTime() > new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() - 1) && new Date(item.date).getTime() < new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() + 1) )?.chasi : '...')
        // console.log("setStavkaView: ", props.post.smeta ? props.post.smeta.find((item) => item.fio_id === specId && new Date(item.date).getTime() > new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() - 1) && new Date(item.date).getTime() < new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() + 1) )?.stavka : '...')
        // console.log("setSmenaView: ", props.post.smeta ? props.post.smeta.find((item) => item.fio_id === specId && new Date(item.date).getTime() > new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() - 1) && new Date(item.date).getTime() < new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() + 1) )?.smena : '...')
        // console.log("setSmenaView: ", props.post.smeta ? props.post.smeta.find((item) => item.fio_id === specId && new Date(item.date).getTime() > new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() - 1) && new Date(item.date).getTime() < new Date(props.post.specs.date).setHours(new Date(props.post.specs.date).getHours() + 1) )?.pererabotka : '...')
        
        
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

    }, [])

    useEffect(()=> {

        //1
        if (props.post.statusMoney === 1) {
            setStatusMoney('Предварительно')

            setValueShkala(1650) //1
        } 
        //2
        else if(props.post.statusMoney === 2) {
            setStatusMoney('Фактически')

            setValueShkala(3800) 
        } 
        //4
        else if(props.post.statusMoney === 4) {
            setStatusMoney('На оплате')
            setValueShkala(8400)
        }
        //5
        else if(props.post.statusMoney === 5) {
            setStatusMoney('Оплачено')
            setValueShkala(10000)
        }
        
        //3
        if (props.post.finalSmeta === 'Подтверждена') {
            setStatusMoney('Подтверждено')

            setValueShkala(5900)
        }
    }, [])

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


    //сумма денег для показа при движении фейдера
    useEffect(()=> {
        setStavkaPlus(stavka)
    }, [stavka])
    
    
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
        // setTimeout(()=> {
        //     setShowInfo(false)
        // }, 1500)
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
                
                <div className='shkala-click' onClick={clickShkala} ></div>

                <RangeSlider min={0} max={10000} value={valueShkala} step={5} stavka={stavka} setStavka={setStavkaPlus} range={10000} distance={valueShkala} percentage={valueShkala/100}/>
                

                <div className='card-footer'>
                    {/* деньги */}
                    <p className='project_money'>{isLoading ? <Loader /> : (stavka ? (isNaN(stavka) ? "0" : parseInt(stavkaPlus ? stavkaPlus : stavka).toLocaleString())+".00" : '0.00')}</p>
                    {/* кнопка Чат */}
                    {props.post.tgURL_chat && <div onClick={goToChat} className='chat-button'>Чат</div>}
                </div>

                

                <div className='smeta' style={{display: showProject ? 'block' : 'none'}}>
                    <div className='line3'></div>
                    <div className='smeta-text'>
                        <ul>
                            <li className='item-list'><div>Специальность</div>{props.post.specs.spec}</li>
                            <li className='item-list'><div>Вид работ</div>{props.post.specs.vid}</li>
                            <li className='item-list'><div>Часы</div>{chasiView ? chasiView : "0"}</li>
                            <li className='item-list'><div>Ставка</div>{isNaN(stavkaView) || stavkaView === null ? "0.00" : parseInt(stavkaView).toLocaleString()+".00"}</li>
                            <li className='item-list'><div>Смена</div>{isNaN(smenaView)|| stavkaView === null ? "0.00" : parseInt(smenaView).toLocaleString()+".00"}</li>
                            <li className='item-list'><div>Переработка</div>{isNaN(pererabotkaView)|| stavkaView === null ? "0.00" : parseInt(pererabotkaView).toLocaleString()+".00"}</li>
                            <li className='item-list'><div>Доп. расходы</div>{"0.00"}</li>
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

                    {/* <p className='vagno'>Важно</p> */}
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