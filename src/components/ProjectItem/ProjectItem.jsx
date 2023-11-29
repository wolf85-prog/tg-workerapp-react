import React from 'react';
import './ProjectItem.css';
import {useNavigate} from "react-router-dom";

import backgroundProject from './../../image/background/bacground_project.png'

const ProjectItem = (props) => {

    //console.log("project title: ", props)

    const navigate = useNavigate();
   
    const statusColor = props.post.status == null ? 'gray' : props.post.status.color;
    const dateProject = props.post.date_start != null ? props.post.date_start : '';
    const dateProject2 = props.post.date_end != null ? props.post.date_end : '';

    let d_end, year2, date2, month2, chas2, minut2;

    const d = new Date(dateProject);

    //console.log("start: ", d)

    //time start
    const year = d.getFullYear()
    const month = String(d.getMonth()+1).padStart(2, "0"); 
    const date = String(d.getDate()).padStart(2, "0"); 
    const chas = String(d.getHours()).padStart(2, "0"); //d.getHours();
    const minut = String(d.getMinutes()).padStart(2, "0"); //d.getMinutes();

    //time end
    if (dateProject2) {
        d_end = new Date(dateProject2);
        year2 = d_end.getFullYear()
        date2 = String(d_end.getDate()).padStart(2, "0"); 
        month2 = String(d_end.getMonth()+1).padStart(2, "0"); 
        chas2 = String(d_end.getHours()).padStart(2, "0"); //d.getHours();
        minut2 = String(d_end.getMinutes()).padStart(2, "0"); //d.getMinutes();
    } 

    const formatted = (d_end) ? `${date}.${month}.${year} - ${date2}.${month2}.${year2}` : `${date}.${month}.${year}`;
    const formattime = `${chas}:${minut}`

    //console.log(props.post.smeta)
    
    const onShowProject = () => {
        navigate('/smeta', {
            state: {
              specId: props.specId,
              proj: props.number,
              title: props.post.title,
              date: props.post.date_start,
              date2: props.post.date_end,
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

    return (
        <div className={`box ${statusColor}`} onClick={onShowProject} style={{ background: `linear-gradient(to bottom right, #000000, #3d413e)` }}>
            <div className="post__content">
                <div className="post_title">{props.post.title} <span style={{color: '#adaa15', fontSize: '20px'}}>1 000.00</span></div>
                <div className="maney_status default-color">Предварительно</div>
                <div>Дата: <span className="subscribe">{formatted}</span> </div>
                <div>Начало: <span className="subscribe">{formattime}</span> </div>
                <div style={{fontSize: '14px'}}>
                    0.00 рублей х 10 часов
                </div>
                <div className='button-chat'>
                    Чат
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;