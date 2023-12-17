import React, {useState, useEffect} from 'react';
import './ProjectItem.css';
import {useNavigate} from "react-router-dom";
import Loader from "./../UI/Loader_min/Loader_min"

import MyModal from "../../components/MyModal/MyModal";
import BackModal from "../../image/new/card.svg"

import { useUsersContext } from "../../contexts/UserContext";
import { getStavka, addStavka, addFactStavka, getSpecStavka } from '../../http/stavkaAPI';

import btnChat from "../../image/new/btn_chat.svg"
import Vector from "../../image/new/vector.svg"
import VectorUp from "../../image/new/vector_up.svg"
import Progress from "../../image/new/progress.svg"
import Ukazatel from "../../image/new/ukazatel.svg"
import Question from "../../image/new/question.svg"
import Close from "../../image/new/close.svg"
import ClosePress from "../../image/new/close_press.svg"
import Shkala from "../../image/new/shkala2.svg"

const ProjectItem = (props) => {

    const navigate = useNavigate();

    const {specId} = useUsersContext();

    const [statusMoney, setStatusMoney] = useState("")
    const [stavka, setStavka] = useState()
    const [cashStavka, setCashStavka] = useState({})

    const [isLoading, setIsLoading] = useState(true);

    const [showProject, setShowProject] = useState(false);
    const [showModalEtap, setShowModalEtap] = useState(false);
    const [widthCard, setWidthCard] = useState(0);
    const [ukazatel, setUkazatel] = useState(0);
    const [widthLine, setWidthLine] = useState(0)
    
    const [showEtap2, setShowEtap2] = useState(false);
    const [showEtap3, setShowEtap3] = useState(false);
    const [showEtap4, setShowEtap4] = useState(false);
    const [showEtap5, setShowEtap5] = useState(false);

    const [formatted, setFormatted] = useState("")
    const [formattime, setFormattime] = useState("")
    const [fact, setFact] = useState()

    const [mainDate, setMainDate] = useState("")

    useEffect(()=> {
        //console.log("props: ", props)
        const statusColor = props.post.status == null ? 'gray' : props.post.status.color;
        const dateProject = props.post.date_start != null ? props.post.date_start : '';
        //console.log("dateProject: ", dateProject)
        //const dateProject2 = props.post.date_end != null ? props.post.date_end : '';
    
        const dateTemp = props.post.specs.date //props.post.specs.filter((item) => item.id === props.specId)[0]?.date;
        //setMainDate(dateTemp)

        
        //const fact = (props.post.smeta.fio_id === props.specId) && (props.post.smeta.date === dateMain) ? props.post.smeta.specialist : 0 //props.post.smeta ? props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.specialist : ""
        const fact = props.post.smeta ? props.post.smeta.filter((item) => item.fio_id === props.specId && new Date(item.date).toLocaleDateString() === new Date(dateTemp).toLocaleDateString())[0]?.specialist : ""
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
    
        //time end
        // if (dateProject2) {
        //     d_end = new Date(dateProject2);
        //     year2 = d_end.getFullYear()
        //     date2 = String(d_end.getDate()).padStart(2, "0"); 
        //     month2 = String(d_end.getMonth()+1).padStart(2, "0"); 
        //     chas2 = String(d_end.getHours()).padStart(2, "0"); //d.getHours();
        //     minut2 = String(d_end.getMinutes()).padStart(2, "0"); //d.getMinutes();
        // } 
    
        const formatted = (d_end) ? `${date}.${month}.${year} - ${date2}.${month2}.${year2}` : `${date}.${month}.${year}`;
        const formattime = `${chas}:${minut}`
        setFormatted(formatted)
        setFormattime(formattime)
    })

    useEffect(()=> {
        //сохранить в бд фактическую ставку
        const saveFact = async() => {
            if (fact) {
                const res = await addFactStavka(props.specId, props.post.id, fact, new Date(props.post.specs.date).toLocaleDateString())

                setCashStavka(res) 
            }
        }

        saveFact()
    }, [fact])
    
    useEffect(()=> {
        const fetch = async() => {
            
            const res0 = await getSpecStavka(props.specId, props.post.id, new Date(props.post.specs.date).toLocaleDateString())
            //console.log("res0: ", new Date(props.post.specs.date).toLocaleDateString())

            //если кэш пуст
            if (!res0) {
                const res = await getStavka(props.post.id, props.post.specs.rowId) //API
                //console.log(res)

                //сохранить в бд предварительную ставку
                const res_add = await addStavka(props.specId, props.post.id, res ? res.payment : 0, new Date(props.post.specs.date).toLocaleDateString()) 
                console.log("pred stavka cash: ", res_add)

                const res2 = await getSpecStavka(props.specId, props.post.id, new Date(props.post.specs.date).toLocaleDateString())
                setCashStavka(res2) 

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

    // useEffect(()=> {
    //    // console.log("cashStavka: ", cashStavka)
    //     if (cashStavka.predStavka) {        
    //         if (cashStavka.factStavka) { 
    //             if (cashStavka.podtverStavka) {
    //                 setStavka(cashStavka.podtverStavka)
    //             } else {
    //                 setStavka(cashStavka.factStavka)
    //             }
    //         } else {
    //             setStavka(cashStavka.predStavka)
    //         }
    //     }  
    // },[])
    
    const onShowProject = () => {
        console.log("props: ", props)
        navigate('/smeta', {
            state: {
              specId: props.specId,
              proj: props.number,
              projId: props.post.id,
              title: props.post.title,
              date: props.post.date_start,
              date2: props.post.date_end,
              staffId: props.post.specs.rowId, //filter((item) => item.id === props.specId)[0]?.rowId,  
              vid: props.post.specs.vid, //filter((item) => item.id === props.specId)[0]?.vid,   
              spec: props.post.specs.spec, //filter((item) => item.id === props.specId)[0]?.spec, 
              dateMain: props.post.specs.date, //filter((item) => item.id === props.specId)[0]?.date,
              start: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.start,
              stop: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.stop,
              chasi: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.chasi,
              smena: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.smena,
              stavka: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.stavka,
              pererabotka: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.pererabotka,
              taxi: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.taxi, 
              gsm: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.gsm,  
              transport: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.transport,   
              specialist: props.post.smeta.filter((item) => item.fio_id === props.specId && item.date.split("T")[0] === props.post.specs.date.split("T")[0])[0]?.specialist, 
            }
        })
    }

    useEffect(()=> {
        console.log("width: ", props.width-50)
        setWidthCard(props.width-50)
    })

    useEffect(()=> {
          
        if (props.post.statusMoney === 1) {
            // setShowEtap1(true)
            setStatusMoney('Предварительно')
            console.log(props.post.statusMoney, Math.floor(widthCard/5))
            setUkazatel(Math.floor(widthCard/5) - Math.floor(widthCard/5))
            setWidthLine(Math.floor((widthCard-120)/5))

        } else if(props.post.statusMoney === 2) {
            // setShowEtap1(true)
            // setShowEtap2(true)
            setStatusMoney('Фактически')
            console.log(props.post.statusMoney, Math.floor(widthCard*2/5))
            setUkazatel(Math.floor(widthCard*2/5)- Math.floor(widthCard*2/5))
            setWidthLine(Math.floor((widthCard-120)*2/5))
        }

        if (props.post.finalSmeta === 'Подтверждена') {
            // setShowEtap1(true)
            // setShowEtap2(true)
            // setShowEtap3(true)
            setStatusMoney('Подтверждено')
            
            console.log(props.post.statusMoney, Math.floor(widthCard*3/5))
            
            setUkazatel(Math.floor(widthCard*3/5)- Math.floor(widthCard*2/5))
            setWidthLine(Math.floor((widthCard-120)*3/5))
        }

        // else if(props.post.statusMoney === 4) {
        //     setShowEtap1(true)
        //     setShowEtap2(true)
        //     setShowEtap3(true)
        //     setShowEtap4(true)
        //     setStatusMoney('На оплате')
        // }
        // else if(props.post.statusMoney === 5) {
        //     setShowEtap1(true)
        //     setShowEtap2(true)
        //     setShowEtap3(true)
        //     setShowEtap4(true)
        //     setShowEtap5(true)
        //     setStatusMoney('Оплачено')
        // }
    }, [widthCard])
    
    const goToChat = (e) => {
        e.stopPropagation();
        //console.log("sdfsdf")
        window.location.replace(props.post.tgURL_chat);
      };

    const clickProject = () => {
        showProject ? setShowProject(false) : setShowProject(true)
    }

    const clickShkala = () => {
        showModalEtap ? setShowModalEtap(false) : setShowModalEtap(true)
    }

    return (
        // <div className={`box`} onClick={onShowProject} style={{ backgroundImage: `url(${plashka})`, backgroundSize: 'cover' }}>
        //     <div className="post__content" style={{position: 'relative'}}>
        //         <div className="post_title">{props.post.title} <span style={{color: '#c9c8c8', fontSize: '20px', marginBottom: '5px'}}>{isLoading ? <Loader /> : (stavka ? parseInt(stavka).toLocaleString()+".00" : 'нет ставки')}</span></div>
        //         <div style={{display: 'flex', justifyContent: 'flex-end'}}><div className={showEtap1 ? 'etap green-fon' : 'etap gray-fon'}></div><div className={showEtap2 ? 'etap green2-fon' : 'etap gray-fon'}></div><div className={showEtap3 ? 'etap green3-fon' : 'etap gray-fon'}></div><div className={showEtap4 ? 'etap green4-fon' : 'etap gray-fon'}></div><div className={showEtap5 ? 'etap green5-fon' : 'etap gray-fon'}></div></div>
        //         <div className="maney_status default-color">{statusMoney}</div>
        //         <div>Дата: <span className="subscribe">{formatted}</span> </div>
        //         <div>Начало: <span className="subscribe">{formattime}</span> </div>
        //         <div style={{fontSize: '14px'}}>
        //             0.00 рублей х 10 часов
        //         </div>
        //         <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: '0', right: '0'}}>
        //             {props.post.tgURL_chat && 
        //             <div className='btn-grad' onClick={goToChat}>
        //                 Чат
        //             </div>
        //             }
        //         </div>
        //     </div>
        // </div>
    <>
        <div className='container'>
            
            <div className='proj-card' onClick={clickProject}>
                <div className='rectangle-projcard'></div>
                <div className='rectangle-projcard2'></div>
                <div className='rectangle-projcard3'></div>
                
                <div className='project-text'>
                    <p className="project_title">{props.post.title}</p>
                    <p className="project_subtitle">{formatted} | {formattime}</p>
                </div>

                <img onClick={clickProject} className='vector' src={showProject ? VectorUp : Vector} alt=''/>   
                 

                <div className='shkala'>
                    <div className='shkala-line1' style={{width:`${widthLine}px`}}></div>
                    <div className='shkala-line2'></div>

                    <img src={Ukazatel} alt='' className='begunok' onClick={clickShkala} style={{left: `${ukazatel}px`}}/>
                    
                    <div className='shkala1'>
                        <img src={Shkala} alt='' className='shkala-img'/>
                    </div>
                </div>

                <div className='card-footer'>
                    <p className='project_money'>{isLoading ? <Loader /> : (stavka ? parseInt(stavka).toLocaleString()+".00" : 'нет ставки')}</p>
                    {props.post.tgURL_chat && <div onClick={goToChat} className='chat-button' style={{backgroundImage: `url(${btnChat})`}}>Чат</div>}
                </div>

                

                <div className='smeta' style={{display: showProject ? 'block' : 'none'}}>
                    <div className='line3'></div>
                    <div className='smeta-text'>
                        <ul>
                            <li className='item-list'><div>Специальность</div>{props.post.specs.spec}</li>
                            <li className='item-list'><div>Вид работ</div>{props.post.specs.vid}</li>
                            <li className='item-list'><div>Часы</div>{props.post.smeta ? props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.chasi : ''}</li>
                            <li className='item-list'><div>Ставка</div>{props.post.smeta ? parseInt(props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.stavka).toLocaleString()+".00" : ''}</li>
                            <li className='item-list'><div>Смена</div>{props.post.smeta ? parseInt(props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.smena).toLocaleString()+".00" : ''}</li>
                            <li className='item-list'><div>Переработка</div></li>
                            <li className='item-list'><div>Доп. расходы</div></li>
                        </ul>
                    </div>
                    <div className='block-button'>
                        <div className='button1'>Уточнить</div>
                        <div className='button2'>Подтвердить</div>
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

                <img onClick={()=>setShowModalEtap(false)} src={Close} alt='' style={{position: 'absolute', top: '20px', right: '20px'}}/>

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
    </>
    );
};

export default ProjectItem;