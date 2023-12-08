import React, {useState, useEffect} from 'react';
import './ProjectItem.css';
import {useNavigate} from "react-router-dom";
import Loader from "./../UI/Loader_min/Loader_min"
import { useUsersContext } from "../../contexts/UserContext";
import { getStavka, addStavka, addFactStavka, getSpecStavka } from '../../http/stavkaAPI';

import plashka from "../../image/buttons/project_plashka.png";

const ProjectItem = (props) => {

    const navigate = useNavigate();

    const {specId} = useUsersContext();

    const [statusMoney, setStatusMoney] = useState("")
    const [stavka, setStavka] = useState()
    const [cashStavka, setCashStavka] = useState({})

    const [isLoading, setIsLoading] = useState(true);

    const [showEtap1, setShowEtap1] = useState(false);
    const [showEtap2, setShowEtap2] = useState(false);
    const [showEtap3, setShowEtap3] = useState(false);
    const [showEtap4, setShowEtap4] = useState(false);
    const [showEtap5, setShowEtap5] = useState(false);

    const [formatted, setFormatted] = useState("")
    const [formattime, setFormattime] = useState("")
    const [fact, setFact] = useState()

    useEffect(()=> {
        //console.log("props: ", props)
        const statusColor = props.post.status == null ? 'gray' : props.post.status.color;
        const dateProject = props.post.date_start != null ? props.post.date_start : '';
        //console.log("dateProject: ", dateProject)
        //const dateProject2 = props.post.date_end != null ? props.post.date_end : '';
    
        const dateMain = props.post.specs.date //props.post.specs.filter((item) => item.id === props.specId)[0]?.date;
        
        const fact = props.post.smeta.fio_id === props.specId ? props.post.smeta.specialist : 0 //props.post.smeta ? props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.specialist : ""
        setFact(fact)
        console.log("fact: ", fact)
    
        let d_end, year2, date2, month2, chas2, minut2;
    
        const d = new Date(dateMain);
    
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
                const res = await addFactStavka(props.specId, props.post.id, fact)

                setCashStavka(res) 
            }
        }

        saveFact()
    }, [fact])
    
    useEffect(()=> {
        const fetch = async() => {
            
            const res0 = await getSpecStavka(props.specId, props.post.id)
            console.log("res0: ", res0)

            //если кэш пуст
            if (!res0) {
                const res = await getStavka(props.post.id, props.post.specs.filter((item) => item.id === props.specId)[0]?.rowId)
                console.log(res)

                //сохранить в бд предварительную ставку
                const res_add = await addStavka(props.specId, props.post.id, res ? res.payment : 0) 
                console.log("pred stavka cash: ", res_add)

                const res2 = await getSpecStavka(props.specId, props.post.id)
                setCashStavka(res2) 

                setIsLoading(false)
                    
            } else {                
                setCashStavka(res0) // данные из кэша
                setIsLoading(false)
            }      
        }

        fetch()
    }, [])

    useEffect(()=> {
        //console.log("cashStavka: ", cashStavka)
        if (cashStavka.predStavka) {        
            if (cashStavka.factStavka) { 
                if (cashStavka.podtverStavka) {
                    setStavka(cashStavka.podtverStavka)
                } else {
                    setStavka(cashStavka.factStavka)
                }
            } else {
                setStavka(cashStavka.predStavka)
            }
        }  
    },[cashStavka])
    
    const onShowProject = () => {
        navigate('/smeta', {
            state: {
              specId: props.specId,
              proj: props.number,
              projId: props.post.id,
              title: props.post.title,
              date: props.post.date_start,
              date2: props.post.date_end,
              staffId: props.post.specs.filter((item) => item.id === props.specId)[0]?.rowId,  
              vid: props.post.specs.filter((item) => item.id === props.specId)[0]?.vid,   
              spec: props.post.specs.filter((item) => item.id === props.specId)[0]?.spec, 
              dateMain: props.post.specs.filter((item) => item.id === props.specId)[0]?.date,
              start: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.start,
              stop: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.stop,
              chasi: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.chasi,
              smena: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.smena,
              stavka: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.stavka,
              pererabotka: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.pererabotka,
              taxi: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.taxi, 
              gsm: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.gsm,  
              transport: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.transport,   
              specialist: props.post.smeta.filter((item) => item.fio_id === props.specId)[0]?.specialist, 
            }
        })
    }

    useEffect(()=> {
        //console.log(props.post.finalSmeta)
        
        if (props.post.statusMoney === 1) {
            setShowEtap1(true)
            setStatusMoney('Предварительно')
        } else if(props.post.statusMoney === 2) {
            setShowEtap1(true)
            setShowEtap2(true)
            setStatusMoney('Фактически')
        }

        if (props.post.finalSmeta === 'Подтверждена') {
            setShowEtap1(true)
            setShowEtap2(true)
            setShowEtap3(true)
            setStatusMoney('Подтверждено')
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
    }, [])
    
    const goToChat = (e) => {
        e.stopPropagation();
        //console.log("sdfsdf")
        window.location.replace(props.post.tgURL_chat);
      };

    return (
        // <div className={`box ${statusColor}`} onClick={onShowProject} style={{ background: `linear-gradient(to bottom right, #000000, #3d413e)` }}>
        <div className={`box`} onClick={onShowProject} style={{ backgroundImage: `url(${plashka})`, backgroundSize: 'cover' }}>
            <div className="post__content" style={{position: 'relative'}}>
                <div className="post_title">{props.post.title} <span style={{color: '#c9c8c8', fontSize: '20px'}}>{isLoading ? <Loader /> : (stavka ? parseInt(stavka).toLocaleString()+".00" : 'нет ставки')}</span></div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}><div className={showEtap1 ? 'etap green-fon' : 'etap gray-fon'}></div><div className={showEtap2 ? 'etap green2-fon' : 'etap gray-fon'}></div><div className={showEtap3 ? 'etap green3-fon' : 'etap gray-fon'}></div><div className={showEtap4 ? 'etap green4-fon' : 'etap gray-fon'}></div><div className={showEtap5 ? 'etap green5-fon' : 'etap gray-fon'}></div></div>
                <div className="maney_status default-color">{statusMoney}</div>
                <div>Дата: <span className="subscribe">{formatted}</span> </div>
                <div>Начало: <span className="subscribe">{formattime}</span> </div>
                <div style={{fontSize: '14px'}}>
                    0.00 рублей х 10 часов
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', position: 'absolute', bottom: '0', right: '0'}}>
                    {props.post.tgURL_chat && 
                    <div className='btn-grad' onClick={goToChat}>
                        Чат
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;